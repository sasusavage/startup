import logging

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Enquiry
from ..ratelimit import rate_limit
from ..schemas import ContactIn, ContactOut
from ..telegram import send_enquiry

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactOut, dependencies=[Depends(rate_limit)])
async def submit_contact(payload: ContactIn, db: Session = Depends(get_db)) -> ContactOut:
    # Honeypot. Look successful so the bot doesn't retry, but store nothing.
    if payload.website:
        logger.info("Dropped honeypot submission from %s", payload.email)
        return ContactOut(ok=True, delivered=True)

    # Save first: Telegram being down must never lose an enquiry.
    enquiry = Enquiry(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(enquiry)
    db.commit()

    delivered, error = await send_enquiry(payload)

    enquiry.delivered_to_telegram = delivered
    enquiry.delivery_error = error
    db.commit()

    # The submission is stored either way, so the visitor sees success.
    return ContactOut(ok=True, delivered=delivered)
