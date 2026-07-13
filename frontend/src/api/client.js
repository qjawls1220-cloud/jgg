const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:8000" : "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail ?? "요청을 처리하지 못했습니다.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  getRoster: () => request("/api/roster"),
  listPosts: () => request("/api/posts"),
  createPost: (payload) =>
    request("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updatePost: (id, payload) =>
    request(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deletePost: (id) =>
    request(`/api/posts/${id}`, {
      method: "DELETE",
    }),
  submitTryout: (payload) =>
    request("/api/tryouts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
