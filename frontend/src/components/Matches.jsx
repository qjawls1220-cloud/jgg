import { useEffect, useState } from "react";

import { api } from "../api/client";
import { matches as emptyMatches } from "../data/siteData";

const STORAGE_KEY = "jgg_matches";

function getStoredMatches() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : emptyMatches;
  } catch {
    return emptyMatches;
  }
}

function saveStoredMatches(nextMatches) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMatches));
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }
}

function formatMatchDate(value) {
  if (!value) return { day: "TBD", month: "" };
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return { day: "TBD", month: "" };

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

function normalizeMatch(match) {
  const { day, month } = formatMatchDate(match.match_date);
  return {
    ...match,
    day,
    month,
    versus: match.opponent,
    resultText: match.result_text,
  };
}

function MatchCard({ match, onDelete }) {
  const display = normalizeMatch(match);

  return (
    <article className="match-card">
      <div className="match-date">
        <div className="match-date-day">{display.day}</div>
        <div className="match-date-mon">{display.month}</div>
      </div>
      <div className="match-divider" />
      <div className="match-info">
        <div className="match-tournament">{display.tournament}</div>
        <div className="match-vs">{display.versus}</div>
        <div className="match-game-tag">{display.game}</div>
      </div>
      <div className={`match-result ${display.result}`}>{display.resultText}</div>
      <button className="match-delete" type="button" onClick={() => onDelete(match.id)} aria-label="경기 삭제">
        삭제
      </button>
    </article>
  );
}

function EmptyMatches({ children }) {
  return <div className="matches-empty">{children}</div>;
}

export default function Matches() {
  const [matchData, setMatchData] = useState(emptyMatches);
  const [storageMode, setStorageMode] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let isMounted = true;

    api
      .listMatches()
      .then((data) => {
        if (isMounted) setMatchData(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setStorageMode(true);
        setMatchData(getStoredMatches());
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const updateMatches = (nextMatches) => {
    setMatchData(nextMatches);
    if (storageMode) saveStoredMatches(nextMatches);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const kind = String(data.get("kind") ?? "upcoming");
    const result = kind === "upcoming" ? "upcoming" : String(data.get("result") ?? "win");
    const resultText = kind === "upcoming" ? "예정" : String(data.get("result_text") ?? "").trim();

    const payload = {
      kind,
      match_date: String(data.get("match_date") ?? ""),
      tournament: String(data.get("tournament") ?? "").trim(),
      opponent: String(data.get("opponent") ?? "").trim(),
      game: String(data.get("game") ?? "LoL"),
      result,
      result_text: resultText || "결과 입력",
    };

    setBusy(true);
    setStatusText("");

    try {
      const saved = storageMode
        ? { ...payload, id: `local-${Date.now()}`, created_at: new Date().toISOString() }
        : await api.createMatch(payload);
      const nextMatches = {
        ...matchData,
        [saved.kind]: saved.kind === "recent" ? [saved, ...matchData.recent] : [...matchData.upcoming, saved],
      };
      updateMatches(nextMatches);
      form.reset();
      setStatusText(storageMode ? "이 브라우저에 경기가 저장되었습니다." : "경기가 추가되었습니다.");
    } catch (error) {
      setStorageMode(true);
      const saved = { ...payload, id: `local-${Date.now()}`, created_at: new Date().toISOString() };
      const current = getStoredMatches();
      const nextMatches = {
        ...current,
        [saved.kind]: saved.kind === "recent" ? [saved, ...current.recent] : [...current.upcoming, saved],
      };
      saveStoredMatches(nextMatches);
      setMatchData(nextMatches);
      form.reset();
      setStatusText("서버 연결이 없어 이 브라우저에 경기가 저장되었습니다.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (matchId) => {
    const nextMatches = {
      upcoming: matchData.upcoming.filter((match) => match.id !== matchId),
      recent: matchData.recent.filter((match) => match.id !== matchId),
    };

    if (!storageMode && !String(matchId).startsWith("local-")) {
      try {
        await api.deleteMatch(matchId);
      } catch {
        setStatusText("서버 삭제는 실패했지만 화면에서는 제거했습니다.");
      }
    }

    updateMatches(nextMatches);
  };

  return (
    <section id="matches">
      <div className="section-inner">
        <div className="reveal match-heading">
          <p className="section-eyebrow">Schedule & Results</p>
          <h2 className="section-title">
            경기 <span className="gold">일정</span>
          </h2>
          <div className="gold-bar" />
        </div>

        <form className="match-add-panel reveal" onSubmit={handleSubmit}>
          <div className="match-add-title">경기 추가</div>
          <div className="match-form-grid">
            <label>
              종류
              <select name="kind" defaultValue="upcoming">
                <option value="upcoming">예정 경기</option>
                <option value="recent">최근 결과</option>
              </select>
            </label>
            <label>
              날짜
              <input type="date" name="match_date" required />
            </label>
            <label>
              종목
              <select name="game" defaultValue="LoL">
                <option value="LoL">LoL</option>
                <option value="VAL">VAL</option>
              </select>
            </label>
            <label>
              대회명
              <input type="text" name="tournament" placeholder="대회명" required />
            </label>
            <label>
              상대
              <input type="text" name="opponent" placeholder="상대 팀" required />
            </label>
            <label>
              결과
              <select name="result" defaultValue="win">
                <option value="win">승리</option>
                <option value="loss">패배</option>
                <option value="draw">무승부</option>
              </select>
            </label>
            <label className="match-score-field">
              스코어
              <input type="text" name="result_text" placeholder="2 - 1" />
            </label>
          </div>
          {statusText && <p className="match-status">{statusText}</p>}
          <button className="btn-match-add" type="submit" disabled={busy}>
            {busy ? "추가 중..." : "경기 추가"}
          </button>
        </form>

        <div className="matches-grid">
          <div className="reveal visible">
            <div className="matches-col-title">다가오는 경기</div>
            <div className="match-list">
              {matchData.upcoming.length === 0 ? (
                <EmptyMatches>등록된 예정 경기가 없습니다.</EmptyMatches>
              ) : (
                matchData.upcoming.map((match) => (
                  <MatchCard match={match} key={match.id} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
          <div className="reveal visible">
            <div className="matches-col-title">최근 결과</div>
            <div className="match-list">
              {matchData.recent.length === 0 ? (
                <EmptyMatches>최근에 진행한 경기가 없습니다.</EmptyMatches>
              ) : (
                matchData.recent.map((match) => (
                  <MatchCard match={match} key={match.id} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
