from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, matches, posts, roster, tryouts
from app.core.config import settings


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="API server for the JGG Esports website.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(roster.router, prefix="/api")
    app.include_router(matches.router, prefix="/api")
    app.include_router(posts.router, prefix="/api")
    app.include_router(tryouts.router, prefix="/api")

    @app.get("/", tags=["root"])
    async def root() -> dict[str, str]:
        return {"message": "JGG API is running"}

    return app


app = create_app()
