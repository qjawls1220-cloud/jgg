import { useState } from "react";

import { api } from "../api/client";

export default function Tryout() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setBusy(true);
    setStatus({ type: "", message: "" });

    try {
      await api.submitTryout({
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        discord: String(data.get("discord") ?? "").trim(),
        game: String(data.get("game") ?? "lol"),
        role: String(data.get("role") ?? "").trim(),
        rank: String(data.get("rank") ?? "").trim(),
        age: Number(data.get("age")),
        message: String(data.get("message") ?? "").trim(),
      });
      form.reset();
      setStatus({ type: "success", message: "지원서가 접수되었습니다." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="tryout">
      <div className="section-inner">
        <div className="tryout-inner">
          <div className="reveal">
            <p className="section-eyebrow">Join JGG</p>
            <h2 className="section-title light">
              트라이<span className="gold">아웃</span>
            </h2>
            <div className="gold-bar" />
            <p className="section-desc light">
              JGG와 함께 정상을 향해 달릴 선수를 찾습니다.
              <br />
              실력과 열정만 있다면 누구든 지원 가능합니다.
            </p>
            <div className="contact-block">
              <p className="contact-label">문의 이메일</p>
              <a className="contact-link" href="mailto:qjawls1220@gmail.com">
                qjawls1220@gmail.com
              </a>
            </div>
          </div>
          <div className="tryout-form reveal">
            <div className="form-title">지원서 작성</div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tryout-name">닉네임</label>
                  <input id="tryout-name" type="text" name="name" placeholder="인게임 닉네임" required />
                </div>
                <div className="form-group">
                  <label htmlFor="tryout-age">나이</label>
                  <input id="tryout-age" type="number" name="age" min="12" max="80" placeholder="18" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tryout-email">이메일</label>
                  <input id="tryout-email" type="email" name="email" placeholder="example@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="tryout-discord">디스코드</label>
                  <input id="tryout-discord" type="text" name="discord" placeholder="JGG#0000" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tryout-game">지원 종목</label>
                  <select id="tryout-game" name="game" required>
                    <option value="lol">리그오브레전드</option>
                    <option value="valorant">발로란트</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tryout-role">포지션 / 역할</label>
                  <select id="tryout-role" name="role" required>
                    <option value="">선택하세요</option>
                    <option>Top</option>
                    <option>Jungle</option>
                    <option>Mid</option>
                    <option>Bot (ADC)</option>
                    <option>Support</option>
                    <option>Duelist</option>
                    <option>Initiator</option>
                    <option>Controller</option>
                    <option>Sentinel</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tryout-rank">현재 티어</label>
                <input id="tryout-rank" type="text" name="rank" placeholder="챌린저 / 레디언트 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="tryout-message">자기소개</label>
                <textarea id="tryout-message" name="message" placeholder="경력, 참가 대회, 지원 동기 등을 자유롭게 작성해주세요." required />
              </div>
              {status.message && <p className={`status-message ${status.type}`}>{status.message}</p>}
              <button type="submit" className="btn-submit" disabled={busy}>
                {busy ? "제출 중..." : "지원서 제출하기"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
