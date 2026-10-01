import { courseLinks } from '../../data/courseLinks';
import styles from './Contact.module.css';

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.externalIcon} aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
      <path d="m9.7 13.9 4.2-3.8" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PlatformIcon({ type }) {
  if (type === 'telegram') return <TelegramIcon />;
  if (type === 'quera') return <CodeIcon />;
  return <ChatIcon />;
}

function getInitials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

const TA_CONTACT_HEADS = [
  {
    id: 'head-01',
    name: 'Amir Jebbeli',
    badge: 'HTA',
    scope: 'Overall Course Logistics & Head TA Support',
    email: 'Amirjebbeli75@outlook.com',
    telegram: '@Amir_Jebbeli',
    image: '/images/tas/Amir Jebbeli.jpg',
  },
  {
    id: 'head-02',
    name: 'Kasra Nouri',
    badge: 'HTA',
    scope: 'Overall Course Logistics & Head TA Support',
    email: 'kasra.nouri85@gmail.com',
    telegram: '@UnicornKN',
    image: '/images/tas/Kasra Nouri.jpg',
  },
  {
    id: 'head-recitation',
    name: 'Kian Sharifian',
    badge: 'Recitation Head',
    scope: 'Weekly Problem-Solving & Tutorial Sessions',
    telegram: '@kian_sharifan',
  },
  {
    id: 'head-hw',
    name: 'Elmira Bekiasai',
    badge: 'HW Head',
    scope: 'Homework Assignments & Problem Sets',
    email: 'elmirabekiasai220@gmail.com',
    telegram: '@elmira85b',
    image: '/images/tas/Elmira Bekiasai.jpg',
  },
  {
    id: 'head-project',
    name: 'Mobina Hoshiaripour',
    badge: 'Project Head',
    scope: 'Course Programming & Research Project',
    email: 'ma.hoshiar@gmail.com',
    telegram: '@mobinahhh',
    image: '/images/tas/Mobina Hoshiaripour.jpg',
  },
  {
    id: 'head-quiz',
    name: 'Iliya Ebrahimi',
    badge: 'Quiz Head',
    scope: 'Weekly Quizzes & Exam Grading',
    email: 'iliyaebrahimiwork1000@gmail.com',
    telegram: '@Iliya_Ebrahimi',
    image: '/images/tas/Iliya Ebrahimi.jpg',
  },
];

function Contact() {
  return (
    <div className={styles.page}>
      {/* PAGE HEADER */}
      <header className={styles.header}>
        <p className={styles.eyebrow}>Discrete Mathematics</p>
        <h1 className={styles.title}>Contact Us &amp; Course Channels</h1>
        <p className={styles.subtitle}>
          Have a question about homeworks, project specs, quizzes, or recitation classes?
          Reach out directly to the corresponding team head or join the official course channels.
        </p>
      </header>

      {/* SECTION 1: OFFICIAL CHANNELS */}
      <section className={styles.section} aria-labelledby="channels-heading">
        <h2 id="channels-heading" className={styles.sectionTitle}>Official Channels &amp; Platforms</h2>
        <p className={styles.sectionDesc}>Direct portals for announcements, discussion, homework submission, and social media.</p>

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
              <ExternalIcon />
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 2: TEAM HEAD CONTACT CARDS */}
      <section className={styles.section} aria-labelledby="team-contacts-heading">
        <h2 id="team-contacts-heading" className={styles.sectionTitle}>Teaching Team Section Heads</h2>
        <p className={styles.sectionDesc}>Connect directly with the TA head responsible for your specific topic or concern.</p>

        <div className={styles.teamGrid}>
          {TA_CONTACT_HEADS.map((member) => {
            const telegramHandle = member.telegram?.replace(/^@/, '');

            return (
              <article key={member.id} className={styles.contactCard}>
                <div className={styles.cardTop}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} className={styles.avatar} />
                  ) : (
                    <div className={styles.avatarFallback} role="img" aria-label={member.name}>
                      {getInitials(member.name)}
                    </div>
                  )}
                  <span className={`${styles.badge} ${member.badge === 'HTA' ? styles.htaBadge : ''}`}>
                    {member.badge}
                  </span>
                </div>

                <div className={styles.memberIdentity}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberScope}>{member.scope}</p>
                </div>

                <div className={styles.cardDivider} />

                <div className={styles.contactActions}>
                  {member.telegram && (
                    <a
                      href={`https://t.me/${telegramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.actionBtn} ${styles.telegramBtn}`}
                      title={`Telegram: ${member.telegram}`}
                    >
                      <TelegramIcon />
                      <span className={styles.btnText}>Telegram: {member.telegram}</span>
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className={styles.actionBtn}
                      title={`Email: ${member.email}`}
                    >
                      <EmailIcon />
                      <span className={styles.btnText}>{member.email}</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* LOCATION & DEPARTMENT BANNER */}
      <div className={styles.locationBanner}>
        <div className={styles.locationIcon}>
          <MapPinIcon />
        </div>
        <div className={styles.locationText}>
          <h3>Department of Computer Engineering</h3>
          <p>Iran University of Science and Technology (IUST) · Narmak, Tehran, Iran</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
