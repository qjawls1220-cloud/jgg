from fastapi import APIRouter, status

from app.models.schemas import Tryout, TryoutCreate
from app.services.tryouts import tryout_store


router = APIRouter(prefix="/tryouts", tags=["tryouts"])


@router.post("", response_model=Tryout, status_code=status.HTTP_201_CREATED)
async def create_tryout(payload: TryoutCreate) -> Tryout:
    return tryout_store.create(payload)


@router.get("", response_model=list[Tryout])
async def list_tryouts() -> list[Tryout]:
    return tryout_store.list()
