import { achievementStats, trophies } from "../data/siteData";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="section-inner">
        <div className="achievements-inner">
          <div className="reveal">
            <p className="section-eyebrow">Hall of Fame</p>
            <h2 className="section-title light">
              주요 <span className="gold">수상</span>
            </h2>
            <div className="gold-bar" />
            <p className="section-desc light">
              JGG는 창단 이래 국내외 주요 대회에서 꾸준한 성과를 올리며 최정상 팀으로 성장하고 있습니다.
            </p>
            <div className="achievements-trophies">
              {trophies.map((item) => (
                <div className="trophy-card" key={`${item.title}-${item.meta}`}>
                  <div className="trophy-icon">{item.icon}</div>
                  <div className="trophy-title">{item.title}</div>
                  <div className="trophy-meta">{item.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal achievement-stats">
            {achievementStats.map((stat) => (
              <div className="ach-stat-card" key={stat.label}>
                <div className="ach-stat-num">{stat.value}</div>
                <div className="ach-stat-lbl">
                  {stat.label}
                  <br />
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
