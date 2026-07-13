import { useState } from "react";

const tabs = [
  { id: "lol", label: "⚔ 리그오브레전드", badge: "LoL", avatarClass: "lol-bg" },
  { id: "valorant", label: "◈ 발로란트", badge: "VAL", avatarClass: "val-bg" },
];

const roleIconByRole = {
  "Top Laner": "/Image/LOL/Top.svg",
  Jungler: "/Image/LOL/JGL.svg",
  "Mid Laner": "/Image/LOL/MID.svg",
  "Bot Laner (ADC)": "/Image/LOL/BOT.svg",
  Support: "/Image/LOL/SPT.svg",
  "Controller · IGL": "/Image/VAL/Controller.svg",
  Controller: "/Image/VAL/Controller.svg",
  Duelist: "/Image/VAL/Duelist.svg",
  Initiator: "/Image/VAL/Initiator.svg",
  Sentinel: "/Image/VAL/Sentinel.svg",
};

export default function Roster({ roster }) {
  const [active, setActive] = useState("lol");
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const players = roster[active] ?? [];

  return (
    <section id="roster">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-eyebrow">Our Players</p>
          <h2 className="section-title">
            팀 <span className="gold">로스터</span>
          </h2>
          <div className="gold-bar" />
        </div>

        <div className="reveal roster-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${active === tab.id ? " active" : ""}`}
              type="button"
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="roster-panel active">
          <div className="roster-grid">
            {players.map((player, index) => {
              const roleIcon = player.role_icon ?? roleIconByRole[player.role];

              return (
                <article key={player.id} className={`player-card reveal reveal-delay-${index % 3}`}>
                  <div className={`player-avatar ${activeTab.avatarClass}`}>
                    {roleIcon && (
                      <img
                        className="player-role-icon"
                        src={roleIcon}
                        alt={`${player.role} 포지션 아이콘`}
                      />
                    )}
                    <span className={`player-game-badge ${active === "lol" ? "lol" : "val"}`}>{activeTab.badge}</span>
                  </div>
                  <div className="player-info">
                    <div className="player-role">{player.role}</div>
                    <div className="player-nickname">{player.nickname}</div>
                    <div className="player-realname">{player.real_name}</div>
                    <div className="player-stats-row">
                      <div className="player-stat">
                        <div className="player-stat-val">{player.region}</div>
                        <div className="player-stat-lbl">서버</div>
                      </div>
                      <div className="player-stat">
                        <div className="player-stat-val">{player.tier}</div>
                        <div className="player-stat-lbl">등급</div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
