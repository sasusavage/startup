import html
import logging

import httpx

from .config import get_settings
from .schemas import ContactIn

logger = logging.getLogger(__name__)

TIMEOUT = httpx.Timeout(10.0)


def format_enquiry(data: ContactIn) -> str:
    """Telegram HTML parse mode — every user value is escaped before it goes in."""

    def esc(value: str) -> str:
        return html.escape(value or "")

    lines = [
        "<b>🔔 New enquiry — sasusync.com</b>",
        "",
        f"<b>Name:</b> {esc(data.name)}",
        f"<b>Email:</b> {esc(data.email)}",
    ]
    if data.phone:
        lines.append(f"<b>Phone:</b> {esc(data.phone)}")
    if data.subject:
        lines.append(f"<b>Subject:</b> {esc(data.subject)}")
    lines += ["", esc(data.message)]
    return "\n".join(lines)


async def send_enquiry(data: ContactIn) -> tuple[bool, str]:
    """Returns (delivered, error). Never raises — a Telegram outage must not
    lose the enquiry, which is already saved to Postgres by the caller."""
    settings = get_settings()

    if not settings.telegram_configured:
        return False, "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set"

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": format_enquiry(data),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            response = await client.post(url, json=payload)

        if response.status_code == 200:
            return True, ""

        # Log without the token — the URL contains it, the body does not.
        logger.warning("Telegram rejected enquiry: %s %s", response.status_code, response.text)
        return False, f"Telegram returned {response.status_code}"
    except httpx.HTTPError as exc:
        logger.warning("Telegram request failed: %s", exc)
        return False, f"Telegram unreachable: {type(exc).__name__}"
