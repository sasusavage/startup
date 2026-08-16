from collections.abc import Generator

from sqlalchemy import MetaData, create_engine, event, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from .config import get_settings

settings = get_settings()


def normalize_url(url: str) -> str:
    """SQLAlchemy 2.x dropped the bare "postgres://" scheme that hosting
    providers still hand out. Rewrite it or create_engine raises."""
    if url.startswith("postgres://"):
        return "postgresql://" + url[len("postgres://") :]
    return url


engine = create_engine(
    normalize_url(settings.database_url),
    # Checks the connection is alive before handing it out. Without this, a
    # connection killed server-side (idle timeout, restart, failover) gets
    # handed to a request and blows up with "connection already closed".
    pool_pre_ping=True,
    pool_recycle=1800,
    # This Postgres is shared with the live portfolio site. Stay a modest
    # tenant rather than eating the server's connection budget.
    pool_size=5,
    max_overflow=5,
)


@event.listens_for(engine, "connect", insert=True)
def _set_search_path(dbapi_connection, _record):
    """Pin every connection to our schema, then public. Belt and braces —
    the models are schema-qualified too, but this keeps any raw SQL honest."""
    cursor = dbapi_connection.cursor()
    cursor.execute(f'SET search_path TO "{settings.db_schema}", public')
    cursor.close()


SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    # Everything we define lands in our own schema, never in public, which
    # belongs to the portfolio site.
    metadata = MetaData(schema=settings.db_schema)


def ensure_schema() -> None:
    """create_all() will not create the schema itself."""
    with engine.begin() as connection:
        connection.execute(text(f'CREATE SCHEMA IF NOT EXISTS "{settings.db_schema}"'))


def get_db() -> Generator[Session, None, None]:
    """One session per request, always closed."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
