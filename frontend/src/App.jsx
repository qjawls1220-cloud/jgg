import { useEffect, useState } from "react";

import { api } from "./api/client";
import { fallbackRoster } from "./data/siteData";
import Achievements from "./components/Achievements.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Board from "./components/Board.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Matches from "./components/Matches.jsx";
import Roster from "./components/Roster.jsx";
import Sponsors from "./components/Sponsors.jsx";
import Tryout from "./components/Tryout.jsx";

function useRevealAnimation() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => entry.target.classList.add("visible"), index * 70);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  });
}

export default function App() {
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(null);
  const [roster, setRoster] = useState(fallbackRoster);

  useRevealAnimation();

  useEffect(() => {
    let isMounted = true;
    api
      .getRoster()
      .then((data) => {
        if (isMounted) setRoster(data);
      })
      .catch(() => {
        if (isMounted) setRoster(fallbackRoster);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onModeChange={setAuthMode}
        onAuth={(nextUser) => {
          setUser(nextUser);
          setAuthMode(null);
        }}
      />
      <Header
        user={user}
        onAuthOpen={setAuthMode}
        onLogout={() => setUser(null)}
      />
      <main>
        <Hero />
        <Roster roster={roster} />
        <Achievements />
        <Matches />
        <Board user={user} onAuthOpen={() => setAuthMode("login")} />
        <Sponsors />
        <Tryout />
      </main>
      <Footer />
    </>
  );
}
