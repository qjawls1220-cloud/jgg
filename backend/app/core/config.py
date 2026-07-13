from dataclasses import dataclass
import os


def _csv(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str
    cors_origins: list[str]


settings = Settings(
    app_name=os.getenv("APP_NAME", "JGG API"),
    cors_origins=_csv(os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")),
)
