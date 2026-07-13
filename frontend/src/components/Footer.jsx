import { navLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <img src="/logo.jpg" alt="JGG" />
              <span>JGG</span>
            </div>
            <p className="footer-slogan">언제나 즐겁게!</p>
            <p className="footer-tagline">⚔ LoL &nbsp;|&nbsp; ◈ Valorant</p>
          </div>
          <div>
            <div className="footer-col-title">Navigate</div>
            <ul className="footer-links">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Join</div>
            <ul className="footer-links">
              <li>
                <a href="#tryout">Tryout</a>
              </li>
              <li>
                <a href="mailto:qjawls1220@gmail.com">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Follow</div>
            <ul className="footer-links">
              <li>
                <a href="#news">Community</a>
              </li>
              <li>
                <a href="#matches">Matches</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 JGG Esports. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="YouTube">
              ▶
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              📷
            </a>
            <a href="#" className="social-btn" aria-label="X">
              𝕏
            </a>
            <a href="#" className="social-btn" aria-label="Discord">
              🎮
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
