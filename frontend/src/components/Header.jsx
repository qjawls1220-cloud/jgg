import { useEffect, useState } from "react";

import { navLinks } from "../data/siteData";

export default function Header({ user, onAuthOpen, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <a className="nav-logo" href="#hero" onClick={closeMobile}>
          <img src="/logo.jpg" alt="JGG" />
          <span>JGG</span>
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-auth">
          {user ? (
            <>
              <span className="nav-user">👤 {user.displayName || user.email}</span>
              <button className="btn-login" type="button" onClick={onLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btn-login" type="button" onClick={() => onAuthOpen("login")}>
                로그인
              </button>
              <button className="btn-signup" type="button" onClick={() => onAuthOpen("signup")}>
                회원가입
              </button>
            </>
          )}
        </div>
        <button
          className="hamburger"
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMobile}>
            {link.label}
          </a>
        ))}
        <div className="mobile-auth">
          {user ? (
            <button className="btn-login" type="button" onClick={onLogout}>
              로그아웃
            </button>
          ) : (
            <>
              <button className="btn-login" type="button" onClick={() => onAuthOpen("login")}>
                로그인
              </button>
              <button className="btn-signup" type="button" onClick={() => onAuthOpen("signup")}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
