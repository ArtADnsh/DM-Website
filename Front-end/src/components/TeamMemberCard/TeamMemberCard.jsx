import styles from './TeamMemberCard.module.css';

const ROLE_VARIANTS = {
  TA: styles.ta,
  HTA: styles.hta,
  Professor: styles.professor,
};

function getInitials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function TeamMemberCard({ name, role, focus, image, email, telegram, gender = 'male' }) {
  const roleVariant = ROLE_VARIANTS[role] || '';
  const telegramHandle = telegram?.replace(/^@/, '');
  const isPlaceholderTelegram = telegramHandle?.startsWith('replace_me_');

  const defaultAvatar = gender === 'female' ? '/images/anonymous_female.svg' : '/images/anonymous_male.svg';
  const avatarSrc = image || defaultAvatar;

  return (
    <article className={`${styles.card} ${roleVariant}`}>
      <div className={styles.top}>
        <img src={avatarSrc} alt={name} className={styles.avatar} />
        <span className={styles.badge}>{role}</span>
      </div>

      <div className={styles.identity}>
        <h3 className={styles.name}>{name}</h3>
        {focus && <p className={styles.focus}>{focus}</p>}
      </div>

      {(email || telegram) && <div className={styles.divider} />}

      <div className={styles.info}>
        {email && (
          <a href={`mailto:${email}`} className={styles.infoRow} title={email}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            <span className={styles.infoText}>{email}</span>
          </a>
        )}

        {telegram && (
          isPlaceholderTelegram ? (
            <div className={`${styles.infoRow} ${styles.placeholderContact}`} title="Replace this placeholder in src/data/teamMembers.js">
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span className={styles.infoText}>{telegram}</span>
            </div>
          ) : (
            <a
              href={`https://t.me/${telegramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoRow}
              title={telegram}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span className={styles.infoText}>{telegram}</span>
            </a>
          )
        )}
      </div>
    </article>
  );
}

export default TeamMemberCard;
