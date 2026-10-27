import { TelegramIcon, EmailIcon } from "../icons";
import Avatar from "../Avatar/Avatar";
import { getTelegramUrl } from "../../utils/people";
import styles from "./ContactCard.module.css";

/** Personal contact details keep the outline icons, separate from platform branding. */
function ContactCard({ member }) {
  const telegramUrl = getTelegramUrl(member.telegram);
  return (
    <article className={styles.contactCard}>
      <div className={styles.cardTop}>
        <Avatar
          name={member.name}
          image={member.image}
          imageClassName={styles.avatar}
          fallbackClassName={styles.avatarFallback}
        />
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
        {telegramUrl && (
          <a
            href={telegramUrl}
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
