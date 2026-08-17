import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
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


def check_required_config() -> None:
    """Fail loudly and early. An unset DATABASE_URL otherwise falls back to the
    local default, which does not exist in production, and the first symptom is
    a confusing connection error on the first form submission instead."""
    if not settings.database_url or "@db:5432" in settings.database_url:
        raise RuntimeError(
            "DATABASE_URL is not set. Add it in Coolify → Environment Variables."
        )


@asynccontextmanager
async def lifespan(_: FastAPI):
    check_required_config()

    # Shared Postgres: only ever touch our own schema. create_all is
    # checkfirst by default, so it never redefines what already exists —
    # and it cannot see the portfolio site's tables in public at all.
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


# ── the website ─────────────────────────────────────────────────────────────
# Registered last so every /api route above wins the match. The Dockerfile
# copies the built site here; running the backend alone in local dev simply
# leaves this directory absent, which is fine — use `npm run dev` for the UI.
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

if STATIC_DIR.is_dir():
    app.mount(
        "/assets",
        StaticFiles(directory=STATIC_DIR / "assets"),
        name="assets",
    )

    @app.get("/{full_path:path}", include_in_schema=False)
    def serve_site(full_path: str) -> FileResponse:
        # An unmatched /api/* path must 404 as an API, not silently hand back
        # index.html — that turns a typo into a baffling frontend bug.
        if full_path.startswith("api/") or full_path == "api":
            raise HTTPException(status_code=404, detail="Not found")

        candidate = (STATIC_DIR / full_path).resolve()
        if (
            full_path
            and candidate.is_file()
            and candidate.is_relative_to(STATIC_DIR)  # no path traversal
        ):
            return FileResponse(candidate)

        return FileResponse(STATIC_DIR / "index.html")

else:
    logger.warning("No static/ directory — serving the API only.")
