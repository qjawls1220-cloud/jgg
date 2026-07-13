import { matches } from "../data/siteData";

function MatchCard({ match }) {
  return (
    <article className="match-card">
      <div className="match-date">
        <div className="match-date-day">{match.day}</div>
        <div className="match-date-mon">{match.month}</div>
      </div>
      <div className="match-divider" />
      <div className="match-info">
        <div className="match-tournament">{match.tournament}</div>
        <div className="match-vs">{match.versus}</div>
        <div className="match-game-tag">{match.game}</div>
      </div>
      <div className={`match-result ${match.result}`}>{match.resultText}</div>
    </article>
  );
}

export default function Matches() {
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
        <div className="matches-grid">
          <div className="reveal">
            <div className="matches-col-title">다가오는 경기</div>
            <div className="match-list">
              {matches.upcoming.map((match) => (
                <MatchCard match={match} key={`${match.tournament}-${match.game}`} />
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="matches-col-title">최근 결과</div>
            <div className="match-list">
              {matches.recent.map((match) => (
                <MatchCard match={match} key={`${match.tournament}-${match.day}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
