import time

from fastapi import HTTPException, Request, status

from .config import get_settings
from .ratelimit import client_ip

# ip -> (consecutive failures, locked-until timestamp)
_state: dict[str, tuple[int, float]] = {}


def _now() -> float:
    return time.time()


def check_not_locked(request: Request) -> None:
    """Called before the password is even checked."""
    ip = client_ip(request)
    _, locked_until = _state.get(ip, (0, 0.0))

    if locked_until and _now() < locked_until:
        remaining = int(locked_until - _now())
        hours = remaining // 3600
        minutes = (remaining % 3600) // 60
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=(
                f"Too many failed attempts. Locked for another {hours}h {minutes}m."
            ),
            headers={"Retry-After": str(remaining)},
        )

    # Lock expired — start clean.
    if locked_until and _now() >= locked_until:
        _state.pop(ip, None)


def record_failure(request: Request) -> None:
    settings = get_settings()
    ip = client_ip(request)
    failures, _ = _state.get(ip, (0, 0.0))
    failures += 1

    if failures >= settings.admin_max_attempts:
        locked_until = _now() + settings.admin_lockout_hours * 3600
        _state[ip] = (failures, locked_until)
    else:
        _state[ip] = (failures, 0.0)


def record_success(request: Request) -> None:
    _state.pop(client_ip(request), None)


def attempts_left(request: Request) -> int:
    settings = get_settings()
    failures, _ = _state.get(client_ip(request), (0, 0.0))
    return max(0, settings.admin_max_attempts - failures)
