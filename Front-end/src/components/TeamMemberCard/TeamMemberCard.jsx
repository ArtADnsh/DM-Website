import { useState } from "react";
import { EmailIcon, SendIcon } from "../icons";
import { getInitials } from "../../utils/people";
import styles from "./TeamMemberCard.module.css";

const ROLE_VARIANTS = {
  TA: styles.ta,
  HTA: styles.hta,
  Professor: styles.professor,
};

function TeamMemberCard({ name, role, badge, focus, image, email, telegram }) {
  const [imgError, setImgError] = useState(false);
  const isHead = (badge || role)?.toLowerCase().includes("head");
  const roleVariant = isHead ? styles.head : ROLE_VARIANTS[role] || "";
  const telegramHandle = telegram?.replace(/^@/, "");
  const isPlaceholderTelegram = telegramHandle?.startsWith("replace_me_");

  return (
    <article className={`${styles.card} ${roleVariant}`}>
      <div className={styles.top}>
        {image && !imgError ? (
          <img
            loading="lazy"
            decoding="async"
            src={image}
            alt={name}
            className={styles.avatar}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.avatarFallback} role="img" aria-label={name}>
            {getInitials(name, { stripTitle: true })}
          </div>
        )}
        <span className={styles.badge}>{badge || role}</span>
      </div>

      <div className={styles.identity}>
        <h3 className={styles.name}>{name}</h3>
        {focus && <p className={styles.focus}>{focus}</p>}
      </div>

      {(email || telegram) && <div className={styles.divider} />}

      <div className={styles.info}>
        {email && (
          <a href={`mailto:${email}`} className={styles.infoRow} title={email}>
            <EmailIcon className={styles.icon} />
            <span className={styles.infoText}>{email}</span>
          </a>
        )}

        {telegram &&
          (isPlaceholderTelegram ? (
            <div
              className={`${styles.infoRow} ${styles.placeholderContact}`}
              title="Replace this placeholder in src/data/teamMembers.js"
            >
              <SendIcon className={styles.icon} />
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
              <SendIcon className={styles.icon} />
              <span className={styles.infoText}>{telegram}</span>
            </a>
          ))}
      </div>
    </article>
  );
}

export default TeamMemberCard;
