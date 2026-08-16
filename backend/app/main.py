import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from .config import get_settings
from .db import Base, SessionLocal, engine, ensure_schema
from .models import Product
from .routers import admin, contact, products

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

SEED_PRODUCTS = [
    {
        "name": "SMS",
        "domain": "sms.sasusync.com",
        "href": "https://sms.sasusync.com",
        "body": (
            "Send transactional and bulk SMS straight from your app. One API key, "
            "simple REST endpoints, delivery reports included."
        ),
        "status": "live",
        "tags": "REST API,Bulk send,Delivery reports",
        "sort_order": 0,
    }
]


def seed_products() -> None:
    """First boot only — gives the landing page something to show."""
    with SessionLocal() as db:
        if db.scalar(select(Product).limit(1)):
            return
        db.add_all(Product(**row) for row in SEED_PRODUCTS)
        db.commit()
        logger.info("Seeded %d product(s)", len(SEED_PRODUCTS))


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Shared Postgres: only ever touch our own schema. create_all is
    # checkfirst by default, so it never redefines what already exists —
    # and it cannot see the SMS platform's tables in public at all.
    ensure_schema()
    Base.metadata.create_all(bind=engine)
    seed_products()
    logger.info("Tables ready in schema %r", settings.db_schema)

    if not settings.telegram_configured:
        logger.warning("Telegram not configured — enquiries will be stored but not delivered.")
    if not settings.admin_password or not settings.jwt_secret:
        logger.warning("ADMIN_PASSWORD or JWT_SECRET unset — admin endpoints are locked out.")

    yield


app = FastAPI(
    title="SasuSync API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")
app.include_router(products.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/api/health")
def health() -> dict[str, object]:
    return {"ok": True, "telegram": settings.telegram_configured}
