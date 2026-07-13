from datetime import datetime, timezone
from uuid import uuid4

from app.models.schemas import Post, PostCreate, PostUpdate


def _now() -> datetime:
    return datetime.now(timezone.utc)


class PostStore:
    def __init__(self) -> None:
        self._posts: dict[str, Post] = {}

    def list(self) -> list[Post]:
        return sorted(self._posts.values(), key=lambda post: post.created_at, reverse=True)

    def get(self, post_id: str) -> Post | None:
        return self._posts.get(post_id)

    def create(self, payload: PostCreate) -> Post:
        now = _now()
        post = Post(
            id=uuid4().hex,
            created_at=now,
            updated_at=now,
            **payload.model_dump(),
        )
        self._posts[post.id] = post
        return post

    def update(self, post_id: str, payload: PostUpdate) -> Post | None:
        post = self.get(post_id)
        if post is None:
            return None

        data = post.model_dump()
        data.update(payload.model_dump(exclude_unset=True))
        data["updated_at"] = _now()
        updated = Post(**data)
        self._posts[post_id] = updated
        return updated

    def delete(self, post_id: str) -> bool:
        return self._posts.pop(post_id, None) is not None


post_store = PostStore()
