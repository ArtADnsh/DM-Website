import { ExternalIcon, PlatformIcon, MapPinIcon } from "../../components/icons";
import ContactCard from "../../components/ContactCard/ContactCard";
import { contactHeads } from "../../data/contactHeads";
import { courseLinks } from "../../data/courseLinks";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.page}>
      {/* PAGE HEADER */}
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question about homeworks, project specs, quizzes, or recitation
          classes? Reach out directly to the corresponding team head or join the
          official course channels.
        </p>
      </header>

      {/* SECTION 1: OFFICIAL CHANNELS */}
      <section className={styles.section} aria-labelledby="channels-heading">
        <h2 id="channels-heading" className={styles.sectionTitle}>
          Official Channels
        </h2>
        <p className={styles.sectionDesc}>
          Direct portals for announcements, discussion, homework submission, and
          social media.
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
          Teaching Team Section Heads
        </h2>
        <p className={styles.sectionDesc}>
          Connect directly with the TA head responsible for your specific topic
          or concern.
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
          <h3>Department of Computer Engineering</h3>
          <p>
            Iran University of Science and Technology (IUST) · Narmak, Tehran,
            Iran
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
