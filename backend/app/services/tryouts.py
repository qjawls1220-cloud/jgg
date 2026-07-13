from datetime import datetime, timezone
from uuid import uuid4

from app.models.schemas import Tryout, TryoutCreate


class TryoutStore:
    def __init__(self) -> None:
        self._tryouts: dict[str, Tryout] = {}

    def create(self, payload: TryoutCreate) -> Tryout:
        tryout = Tryout(
            id=uuid4().hex,
            submitted_at=datetime.now(timezone.utc),
            **payload.model_dump(),
        )
        self._tryouts[tryout.id] = tryout
        return tryout

    def list(self) -> list[Tryout]:
        return sorted(self._tryouts.values(), key=lambda item: item.submitted_at, reverse=True)


tryout_store = TryoutStore()
