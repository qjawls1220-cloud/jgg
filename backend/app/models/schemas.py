from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, Field


class Player(BaseModel):
    id: str
    game: Literal["lol", "valorant"]
    role: str
    nickname: str
    real_name: str
    role_icon: str | None = None
    region: str = "KR"
    tier: str = "Pro"


class RosterResponse(BaseModel):
    lol: list[Player]
    valorant: list[Player]


class MatchCreate(BaseModel):
    kind: Literal["upcoming", "recent"]
    match_date: date
    tournament: str = Field(min_length=1, max_length=120)
    opponent: str = Field(min_length=1, max_length=120)
    game: Literal["LoL", "VAL"]
    result: Literal["upcoming", "win", "loss", "draw"] = "upcoming"
    result_text: str = Field(min_length=1, max_length=40)


class Match(MatchCreate):
    id: str
    created_at: datetime


class MatchResponse(BaseModel):
    upcoming: list[Match]
    recent: list[Match]


class PostCreate(BaseModel):
    category: str = Field(min_length=1, max_length=20)
    title: str = Field(min_length=1, max_length=120)
    content: str = Field(min_length=1, max_length=5000)
    author: str = Field(min_length=1, max_length=80)
    media_url: str | None = None
    media_type: str | None = None


class PostUpdate(BaseModel):
    category: str | None = Field(default=None, min_length=1, max_length=20)
    title: str | None = Field(default=None, min_length=1, max_length=120)
    content: str | None = Field(default=None, min_length=1, max_length=5000)
    media_url: str | None = None
    media_type: str | None = None


class Post(PostCreate):
    id: str
    created_at: datetime
    updated_at: datetime


class TryoutCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=120)
    discord: str = Field(min_length=1, max_length=80)
    game: Literal["lol", "valorant"]
    role: str = Field(min_length=1, max_length=80)
    rank: str = Field(min_length=1, max_length=80)
    age: int = Field(ge=12, le=80)
    message: str = Field(min_length=1, max_length=3000)


class Tryout(TryoutCreate):
    id: str
    submitted_at: datetime
