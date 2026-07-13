import { useEffect, useMemo, useState } from "react";

import { api } from "../api/client";

const categoryIcons = {
  공지: "📢",
  우승: "🏆",
  선수: "🎮",
  이벤트: "🎉",
  기타: "📝",
};

function formatDate(value, includeTime = false) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

function PostEditorModal({ post, busy, onClose, onSubmit }) {
  const isEdit = Boolean(post);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const mediaUrl = String(form.get("media_url") ?? "").trim();
    const mediaType = String(form.get("media_type") ?? "").trim();

    onSubmit({
      category: String(form.get("category") ?? "").trim(),
      title: String(form.get("title") ?? "").trim(),
      content: String(form.get("content") ?? "").trim(),
      ...(mediaUrl ? { media_url: mediaUrl } : { media_url: null }),
      ...(mediaType ? { media_type: mediaType } : { media_type: null }),
    });
  };

  return (
    <div className="write-modal-overlay open" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="write-modal" role="dialog" aria-modal="true" aria-label={isEdit ? "글 수정" : "글 작성"}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className="write-modal-title">{isEdit ? "글 수정" : "글 작성"}</div>
        <form onSubmit={handleSubmit}>
          <div className="write-group">
            <label htmlFor="post-category">카테고리</label>
            <select id="post-category" name="category" defaultValue={post?.category ?? ""} required>
              <option value="">선택하세요</option>
              <option value="공지">📢 공지</option>
              <option value="우승">🏆 우승</option>
              <option value="선수">🎮 선수</option>
              <option value="이벤트">🎉 이벤트</option>
              <option value="기타">📝 기타</option>
            </select>
          </div>
          <div className="write-group">
            <label htmlFor="post-title">제목</label>
            <input id="post-title" type="text" name="title" placeholder="제목을 입력하세요" defaultValue={post?.title ?? ""} required />
          </div>
          <div className="write-group">
            <label htmlFor="post-content">내용</label>
            <textarea id="post-content" name="content" placeholder="내용을 입력하세요" defaultValue={post?.content ?? ""} required />
          </div>
          <div className="write-group">
            <label htmlFor="post-media-url">미디어 URL</label>
            <input id="post-media-url" type="url" name="media_url" placeholder="https://..." defaultValue={post?.media_url ?? ""} />
          </div>
          <div className="write-group">
            <label htmlFor="post-media-type">미디어 종류</label>
            <select id="post-media-type" name="media_type" defaultValue={post?.media_type ?? ""}>
              <option value="">선택 없음</option>
              <option value="image/">이미지</option>
              <option value="video/">영상</option>
            </select>
          </div>
          <div className="write-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-post" disabled={busy}>
              {busy ? "저장 중..." : isEdit ? "수정 완료" : "게시하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostModal({ post, canEdit, busy, onClose, onEdit, onDelete }) {
  if (!post) return null;

  const icon = categoryIcons[post.category] ?? "📝";
  const isVideo = post.media_type?.startsWith("video");

  return (
    <div className="post-modal-overlay open" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="post-modal" role="dialog" aria-modal="true" aria-label="게시글 상세">
        <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className="post-modal-cat">
          {icon} {post.category}
        </div>
        <div className="post-modal-title">{post.title}</div>
        <div className="post-modal-meta">
          ✍️ {post.author} · {formatDate(post.created_at, true)}
        </div>
        {post.media_url && (
          <div className="post-media">
            {isVideo ? (
              <video src={post.media_url} controls />
            ) : (
              <img src={post.media_url} alt="첨부 이미지" />
            )}
          </div>
        )}
        <div className="post-modal-body">{post.content}</div>
        {canEdit && (
          <div className="post-actions">
            <button className="btn-edit" type="button" onClick={onEdit}>
              수정
            </button>
            <button className="btn-danger" type="button" onClick={onDelete} disabled={busy}>
              {busy ? "삭제 중..." : "삭제"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Board({ user, onAuthOpen }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editorPost, setEditorPost] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    let isMounted = true;
    api
      .listPosts()
      .then((data) => {
        if (isMounted) setPosts(data);
      })
      .catch(() => {
        if (isMounted) setStatusText("게시글을 불러오지 못했습니다.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const hasModal = selectedPost || editorOpen;
    if (hasModal) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [editorOpen, selectedPost]);

  const canEditSelected = useMemo(() => {
    if (!user || !selectedPost) return false;
    return selectedPost.author === user.displayName || selectedPost.author === user.email;
  }, [selectedPost, user]);

  const openEditor = (post = null) => {
    if (!user) {
      onAuthOpen();
      return;
    }
    setEditorPost(post);
    setEditorOpen(true);
    setSelectedPost(null);
    setStatusText("");
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditorPost(null);
    setBusy(false);
  };

  const handleSavePost = async (payload) => {
    if (!user) {
      onAuthOpen();
      return;
    }

    setBusy(true);
    setStatusText("");

    try {
      const saved = editorPost
        ? await api.updatePost(editorPost.id, payload)
        : await api.createPost({
            ...payload,
            author: user.displayName || user.email,
          });

      setPosts((current) => {
        if (editorPost) {
          return current.map((item) => (item.id === saved.id ? saved : item));
        }
        return [saved, ...current];
      });
      closeEditor();
    } catch (error) {
      setStatusText(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    setBusy(true);
    setStatusText("");

    try {
      await api.deletePost(selectedPost.id);
      setPosts((current) => current.filter((post) => post.id !== selectedPost.id));
      setSelectedPost(null);
    } catch (error) {
      setStatusText(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="news">
      <div className="section-inner">
        <div className="news-header reveal">
          <div>
            <p className="section-eyebrow">Community</p>
            <h2 className="section-title">
              팀 <span className="gold">게시판</span>
            </h2>
            <div className="gold-bar" />
          </div>
          <button className="btn-write" type="button" onClick={() => openEditor()}>
            ✏️ 글 작성
          </button>
        </div>
        {statusText && <p className="status-message error">{statusText}</p>}
        <div className="news-grid">
          {posts.length === 0 ? (
            <div className="news-empty">
              <span>📭</span>
              아직 작성된 글이 없습니다.
              <br />
              로그인 후 첫 번째 글을 작성해보세요!
            </div>
          ) : (
            posts.map((post, index) => (
              <article
                className={`news-card${index === 0 ? " featured" : ""}`}
                key={post.id}
                onClick={() => setSelectedPost(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setSelectedPost(post);
                }}
              >
                <div className="news-body">
                  <div className="news-date">{formatDate(post.created_at)}</div>
                  <div className="news-title">{post.title}</div>
                  <div className="news-excerpt">{post.content}</div>
                  <div className="news-author">✍️ {post.author}</div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {editorOpen && (
        <PostEditorModal
          key={editorPost?.id ?? "new"}
          post={editorPost}
          busy={busy}
          onClose={closeEditor}
          onSubmit={handleSavePost}
        />
      )}
      <PostModal
        post={selectedPost}
        canEdit={canEditSelected}
        busy={busy}
        onClose={() => setSelectedPost(null)}
        onEdit={() => openEditor(selectedPost)}
        onDelete={handleDelete}
      />
    </section>
  );
}
