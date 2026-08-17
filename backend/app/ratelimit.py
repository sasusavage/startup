import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

# nginx used to rate limit the contact endpoint. Now that one process serves
# everything, the limit lives here instead. Each submission spends the Telegram
# token, so an unguarded endpoint is a spam funnel into your chat.
WINDOW_SECONDS = 60.0
MAX_PER_WINDOW = 6

_hits: dict[str, deque[float]] = defaultdict(deque)


def client_ip(request: Request) -> str:
    """Behind Coolify's proxy the real address is in X-Forwarded-For."""
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit(request: Request) -> None:
    now = time.monotonic()
    seen = _hits[client_ip(request)]

    while seen and now - seen[0] > WINDOW_SECONDS:
        seen.popleft()

    if len(seen) >= MAX_PER_WINDOW:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many messages. Please wait a minute and try again.",
        )

    seen.append(now)

    # Stop the dict growing without bound on a long-running process.
    if len(_hits) > 2000:
        for key in [k for k, v in _hits.items() if not v]:
            del _hits[key]
