import { useEffect, useRef, useState } from "react";

import { heroStats } from "../data/siteData";

function CountStat({ value, label }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const target = Number.parseInt(value, 10);
    const suffix = value.replace(/[0-9]/g, "");
    if (Number.isNaN(target)) {
      setDisplay(value);
      return undefined;
    }

    const animate = () => {
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = window.setInterval(() => {
        current = Math.min(current + step, target);
        setDisplay(`${current}${suffix}`);
        if (current >= target) window.clearInterval(timer);
      }, 40);
    };

    if (!("IntersectionObserver" in window) || !ref.current) {
      animate();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-number">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-content">
        <img src="/logo.jpg" alt="JGG" className="hero-logo" />
        <div className="hero-games">
          <div className="game-badge lol">⚔ League of Legends</div>
          <div className="game-badge val">◈ Valorant</div>
        </div>
        <h1 className="hero-team-name">
          <span className="gold">JGG</span> Esports
        </h1>
        <p className="hero-slogan">언제나 즐겁게</p>
        <div className="hero-buttons">
          <a href="#roster" className="btn-primary">
            팀 로스터 보기
          </a>
          <a href="#tryout" className="btn-outline">
            트라이아웃 지원
          </a>
        </div>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <CountStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      <div className="hero-scroll">Scroll</div>
    </section>
  );
}
