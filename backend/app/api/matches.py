from fastapi import APIRouter, HTTPException, Response, status

from app.models.schemas import Match, MatchCreate, MatchResponse
from app.services.matches import match_store


router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("", response_model=MatchResponse)
async def list_matches() -> MatchResponse:
    return match_store.list()


@router.post("", response_model=Match, status_code=status.HTTP_201_CREATED)
async def create_match(payload: MatchCreate) -> Match:
    return match_store.create(payload)


@router.delete("/{match_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_match(match_id: str) -> Response:
    if not match_store.delete(match_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Match not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
