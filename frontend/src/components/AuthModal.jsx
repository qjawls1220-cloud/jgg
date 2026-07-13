import { useEffect, useState } from "react";

export default function AuthModal({ mode, onClose, onModeChange, onAuth }) {
  const [error, setError] = useState("");
  const open = Boolean(mode);
  const activeMode = mode ?? "login";

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    setError("");
  }, [mode]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (activeMode === "signup") {
      const passwordConfirm = String(form.get("passwordConfirm") ?? "");
      if (password !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    onAuth({
      email,
      displayName: String(form.get("nickname") ?? email.split("@")[0]).trim(),
    });
  };

  return (
    <div className="modal-overlay open" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="로그인">
        <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className="modal-logo">
          <img src="/logo.jpg" alt="JGG" />
          <span>JGG</span>
        </div>
        <div className="modal-tabs">
          <button
            className={`modal-tab${activeMode === "login" ? " active" : ""}`}
            type="button"
            onClick={() => onModeChange("login")}
          >
            로그인
          </button>
          <button
            className={`modal-tab${activeMode === "signup" ? " active" : ""}`}
            type="button"
            onClick={() => onModeChange("signup")}
          >
            회원가입
          </button>
        </div>

        <form className="modal-form active" onSubmit={handleSubmit}>
          {activeMode === "signup" && (
            <div className="modal-group">
              <label htmlFor="nickname">닉네임</label>
              <input id="nickname" name="nickname" type="text" placeholder="JGG Player" autoComplete="nickname" />
            </div>
          )}
          <div className="modal-group">
            <label htmlFor="email">이메일</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="modal-group">
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required />
          </div>
          {activeMode === "signup" && (
            <div className="modal-group">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="••••••••" autoComplete="new-password" required />
            </div>
          )}
          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className="modal-submit">
            {activeMode === "login" ? "로그인" : "회원가입"}
          </button>
          <p className="modal-switch">
            {activeMode === "login" ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
            <button type="button" onClick={() => onModeChange(activeMode === "login" ? "signup" : "login")}>
              {activeMode === "login" ? "회원가입" : "로그인"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
