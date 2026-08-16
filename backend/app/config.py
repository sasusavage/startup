from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Every value comes from the environment. Nothing secret is hard-coded."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql://sasusync:sasusync@db:5432/sasusync"

    # This Postgres is shared with the SMS platform (venfy2), which owns the
    # public schema: accounts, apps, messages, sms_jobs, contacts, and more.
    # Our tables live in their own schema so the two can never collide.
    db_schema: str = "sasusync_site"

    # From @BotFather. Stays server-side — never sent to the browser.
    telegram_bot_token: str = ""
    # From @userinfobot. Where enquiries get delivered.
    telegram_chat_id: str = ""

    # Admin dashboard login.
    admin_email: str = "admin@sasusync.com"
    admin_password: str = ""
    jwt_secret: str = ""
    jwt_ttl_hours: int = 12

    # Origins allowed to call this API from a browser.
    cors_origins: str = "http://localhost:5173,https://sasusync.com,https://www.sasusync.com"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def telegram_configured(self) -> bool:
        return bool(self.telegram_bot_token and self.telegram_chat_id)


@lru_cache
def get_settings() -> Settings:
    return Settings()
