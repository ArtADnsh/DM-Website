import { courseLinks } from '../../data/courseLinks';
import styles from './Footer.module.css';

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
      <path d="m9.7 13.9 4.2-3.8" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

function PlatformIcon({ type }) {
  if (type === 'telegram') return <TelegramIcon />;
  return <ChatIcon />;
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* TOP MULTI-COLUMN GRID */}
        <div className={styles.grid}>
          {/* COLUMN 1: BRAND & COURSE INFO */}
          <div className={styles.brandCol}>
            <div className={styles.logoBadge}>
              <span className={styles.badgeDot} />
              Discrete Mathematics
            </div>
            <h3 className={styles.courseTitle}>Fall 2026 · Semester 4051</h3>
            <p className={styles.courseDesc}>
              Official course portal for Discrete Mathematics, Department of Computer Engineering at Iran University of Science and Technology.
            </p>
            <div className={styles.profTag}>
              Instructor: <strong>Dr. Tahaei</strong>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="/" data-internal-link>Home Page</a>
              </li>
              <li>
                <a href="/materials" data-internal-link>Course Materials</a>
              </li>
              <li>
                <a href="/tutorials" data-internal-link>Tutorial Recordings</a>
              </li>
              <li>
                <a href="/tas" data-internal-link>Meet the Teaching Team</a>
              </li>
              <li>
                <a href="/contact" data-internal-link>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: USEFUL LINKS & PORTALS */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Useful Links</h4>
            <ul className={styles.portalList}>
              {courseLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.portalLink}
                  >
                    <span className={styles.portalIcon}>
                      <PlatformIcon type={link.type} />
                    </span>
                    <span className={styles.portalCopy}>
                      <strong>{link.title}</strong>
                      <small>{link.subtitle}</small>
                    </span>
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: HEAD TAs & WEBSITE CREATORS */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Head TAs</h4>
            <ul className={styles.contactList}>
              <li>
                <span>Amir Jebbeli</span>
                <a href="https://t.me/Amir_Jebbeli" target="_blank" rel="noreferrer">@Amir_Jebbeli</a>
              </li>
              <li>
                <span>Kasra Nouri</span>
                <a href="https://t.me/UnicornKN" target="_blank" rel="noreferrer">@UnicornKN</a>
              </li>
            </ul>

            <h4 className={`${styles.colTitle} ${styles.subTitle}`}>Website Creators</h4>
            <ul className={styles.contactList}>
              <li>
                <span>Arta Danesh</span>
                <a href="https://t.me/ArtA_Dnsh" target="_blank" rel="noreferrer">@ArtA_Dnsh</a>
              </li>
              <li>
                <span>Koosha Majlesi</span>
                <a href="https://t.me/kmajl84" target="_blank" rel="noreferrer">@kmajl84</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & CREDITS */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 Discrete Mathematics. All rights reserved.
          </p>

          <p className={styles.credits}>
            Designed &amp; Developed by <strong>Arta Danesh</strong> &amp; <strong>Koosha Majlesi</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
