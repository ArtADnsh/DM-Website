import { TelegramIcon, EmailIcon } from "../icons";
import { getInitials } from "../../utils/people";
import styles from "./ContactCard.module.css";

/** Personal contact details keep the outline icons, separate from platform branding. */
function ContactCard({ member }) {
  const telegramHandle = member.telegram?.replace(/^@/, "");
  return (
    <article className={styles.contactCard}>
      <div className={styles.cardTop}>
        {member.image ? (
          <img loading="lazy" decoding="async" src={member.image} alt={member.name} className={styles.avatar} />
        ) : (
          <div
            className={styles.avatarFallback}
            role="img"
            aria-label={member.name}
          >
            {getInitials(member.name)}
          </div>
        )}
        <span
          className={`${styles.badge} ${member.badge === "HTA" ? styles.htaBadge : ""}`}
        >
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
            className={styles.actionBtn}
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
}

export default ContactCard;
