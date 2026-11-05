import { ExternalIcon, PlatformIcon, MapPinIcon } from "../../components/icons";
import ContactCard from "../../components/ContactCard/ContactCard";
import { contactHeads } from "../../data/contactHeads";
import { courseLinks } from "../../data/courseLinks";
import { siteInfo } from "../../data/site";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.page}>
      {/* PAGE HEADER */}
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question about homework, the project, quizzes, or recitation
          classes? Message the relevant team head directly, or join the
          official course channels.
        </p>
      </header>

      {/* SECTION 1: OFFICIAL CHANNELS */}
      <section className={styles.section} aria-labelledby="channels-heading">
        <h2 id="channels-heading" className={styles.sectionTitle}>
          Official Channels
        </h2>
        <p className={styles.sectionDesc}>
          Announcements, discussion, and homework submission.
        </p>

        <div className={styles.channelsGrid}>
          {courseLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
            >
              <div className={styles.channelIcon}>
                <PlatformIcon type={link.type} />
              </div>
              <div className={styles.channelContent}>
                <h3 className={styles.channelTitle}>{link.title}</h3>
                <p className={styles.channelSubtitle}>{link.subtitle}</p>
              </div>
              <ExternalIcon className={styles.externalIcon} />
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 2: TEAM HEAD CONTACT CARDS */}
      <section
        className={styles.section}
        aria-labelledby="team-contacts-heading"
      >
        <h2 id="team-contacts-heading" className={styles.sectionTitle}>
          Who to Contact
        </h2>
        <p className={styles.sectionDesc}>
          Each head below is responsible for one part of the course.
        </p>

        <div className={styles.teamGrid}>
          {contactHeads.map((member) => (
            <ContactCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* LOCATION & DEPARTMENT BANNER */}
      <div className={styles.locationBanner}>
        <div className={styles.locationIcon}>
          <MapPinIcon />
        </div>
        <div className={styles.locationText}>
          <h3>{siteInfo.departmentName}</h3>
          <p>
            {siteInfo.universityName} ({siteInfo.universityShortName}) ·{" "}
            {siteInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
