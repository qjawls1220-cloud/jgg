from fastapi import APIRouter, HTTPException, Response, status

from app.models.schemas import Post, PostCreate, PostUpdate
from app.services.posts import post_store


router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=list[Post])
async def list_posts() -> list[Post]:
    return post_store.list()


@router.post("", response_model=Post, status_code=status.HTTP_201_CREATED)
async def create_post(payload: PostCreate) -> Post:
    return post_store.create(payload)


@router.get("/{post_id}", response_model=Post)
async def get_post(post_id: str) -> Post:
    post = post_store.get(post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post


@router.put("/{post_id}", response_model=Post)
async def update_post(post_id: str, payload: PostUpdate) -> Post:
    post = post_store.update(post_id, payload)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: str) -> Response:
    if not post_store.delete(post_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
