import styles from './TeamMemberCard.module.css';

const ROLE_VARIANTS = {
    TA: styles.ta,
    HTA: styles.hta,
    Professor: styles.professor,
};

function TeamMemberCard({ name, role, image, email, telegram }) {
    const roleVariant = ROLE_VARIANTS[role] || '';
    const telegramHandle = telegram.replace(/^@/, '');

    return (
        <div className={`${styles.card} ${roleVariant}`}>
            <div className={styles.top}>
                <img src={image} alt={name} className={styles.avatar} />

                <span className={styles.badge}>{role}</span>
            </div>

            <h3 className={styles.name}>{name}</h3>

            <div className={styles.divider} />

            <div className={styles.info}>
                <a href={`mailto:${email}`} className={styles.infoRow}>
                    <svg
                        className={styles.icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 6-10 7L2 6" />
                    </svg>

                    <span className={styles.infoText}>{email}</span>
                </a>

                <a
                    href={`https://t.me/${telegramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoRow}
                >
                    <svg
                        className={styles.icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                    </svg>

                    <span className={styles.infoText}>{telegram}</span>
                </a>
            </div>
        </div>
    );
}

export default TeamMemberCard;