import { ExternalIcon, PlatformIcon } from "../icons";
import { courseLinks } from "../../data/courseLinks";
import styles from "./Footer.module.css";

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
              Official course portal for Discrete Mathematics, Department of
              Computer Engineering at Iran University of Science and Technology.
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
                <a href="/" data-internal-link>
                  Home Page
                </a>
              </li>
              <li>
                <a href="/materials" data-internal-link>
                  Course Materials
                </a>
              </li>
              <li>
                <a href="/tutorials" data-internal-link>
                  Tutorial Recordings
                </a>
              </li>
              <li>
                <a href="/tas" data-internal-link>
                  Meet the Teaching Team
                </a>
              </li>
              <li>
                <a href="/contact" data-internal-link>
                  Contact Us
                </a>
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
                <a
                  href="https://t.me/Amir_Jebbeli"
                  target="_blank"
                  rel="noreferrer"
                >
                  @Amir_Jebbeli
                </a>
              </li>
              <li>
                <span>Kasra Nouri</span>
                <a
                  href="https://t.me/UnicornKN"
                  target="_blank"
                  rel="noreferrer"
                >
                  @UnicornKN
                </a>
              </li>
            </ul>

            <h4 className={`${styles.colTitle} ${styles.subTitle}`}>
              Website Creators
            </h4>
            <ul className={styles.contactList}>
              <li>
                <span>Arta Danesh</span>
                <a
                  href="https://t.me/ArtA_Dnsh"
                  target="_blank"
                  rel="noreferrer"
                >
                  @ArtA_Dnsh
                </a>
              </li>
              <li>
                <span>Koosha Majlesi</span>
                <a href="https://t.me/kmajl84" target="_blank" rel="noreferrer">
                  @kmajl84
                </a>
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
            Designed &amp; Developed by <strong>Arta Danesh</strong> &amp;{" "}
            <strong>Koosha Majlesi</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
