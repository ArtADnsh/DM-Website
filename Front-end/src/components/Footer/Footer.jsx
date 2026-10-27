import { ExternalIcon, PlatformIcon } from "../icons";
import { Fragment } from "react";
import { courseLinks } from "../../data/courseLinks";
import { footerLinks } from "../../data/navigation";
import { headTAs, siteInfo, websiteCreators } from "../../data/site";
import { getTelegramUrl } from "../../utils/people";
import styles from "./Footer.module.css";

/** Name + Telegram link for each person; data comes from teamMembers.js. */
function PeopleList({ people }) {
  return (
    <ul className={styles.contactList}>
      {people.map((person) => (
        <li key={person.id}>
          <span>{person.name}</span>
          <a
            href={getTelegramUrl(person.telegram)}
            target="_blank"
            rel="noreferrer"
          >
            {person.telegram}
          </a>
        </li>
      ))}
    </ul>
  );
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
              {siteInfo.courseName}
            </div>
            <h3 className={styles.courseTitle}>
              {siteInfo.term} · Semester {siteInfo.semesterCode}
            </h3>
            <p className={styles.courseDesc}>
              Official course portal for {siteInfo.courseName},{" "}
              {siteInfo.departmentName} at {siteInfo.universityName}.
            </p>
            <div className={styles.profTag}>
              Instructor: <strong>{siteInfo.instructorName}</strong>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} data-internal-link>
                    {item.label}
                  </a>
                </li>
              ))}
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
            <PeopleList people={headTAs} />

            <h4 className={`${styles.colTitle} ${styles.subTitle}`}>
              Website Creators
            </h4>
            <PeopleList people={websiteCreators} />
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & CREDITS */}
        <div className={styles.bottomBar}>
          <p>
            © {siteInfo.copyrightYear} {siteInfo.courseName}. All rights reserved.
          </p>

          <p className={styles.credits}>
            Designed &amp; Developed by{" "}
            {websiteCreators.map((creator, index) => (
              <Fragment key={creator.id}>
                {index > 0 && " & "}
                <strong>{creator.name}</strong>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
