from datetime import datetime, timezone
from uuid import uuid4

from app.models.schemas import Match, MatchCreate, MatchResponse


class MatchStore:
    def __init__(self) -> None:
        self._matches: dict[str, Match] = {}

    def list(self) -> MatchResponse:
        matches = sorted(self._matches.values(), key=lambda item: item.match_date)
        return MatchResponse(
            upcoming=[match for match in matches if match.kind == "upcoming"],
            recent=[match for match in reversed(matches) if match.kind == "recent"],
        )

    def create(self, payload: MatchCreate) -> Match:
        match = Match(
            id=uuid4().hex,
            created_at=datetime.now(timezone.utc),
            **payload.model_dump(),
        )
        self._matches[match.id] = match
        return match

    def delete(self, match_id: str) -> bool:
        return self._matches.pop(match_id, None) is not None


match_store = MatchStore()
