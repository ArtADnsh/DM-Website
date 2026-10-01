import {
  DocumentIcon,
  VideoIcon,
  DownloadIcon,
  PlayIcon,
  ClassIcon,
  ArrowIcon,
} from "../icons";
import styles from "./FileCard.module.css";

const VARIANTS = {
  document: {
    className: styles.document,
    Icon: DocumentIcon,
    ActionIcon: DownloadIcon,
    actionLabel: "Download",
    unavailableLabel: "Coming soon",
    unavailableTitle: "This file has not been uploaded yet",
    isExternal: false,
    getMeta: ({ type, size }) => [type, size],
  },
  video: {
    className: styles.video,
    Icon: VideoIcon,
    ActionIcon: PlayIcon,
    actionLabel: "Watch",
    unavailableLabel: "Coming soon",
    unavailableTitle: "This recording has not been published yet",
    isExternal: true,
    isInternal: false,
    getMeta: ({ duration, instructor }) => ["Video", duration, instructor],
  },
  recitation: {
    className: styles.recitation,
    Icon: ClassIcon,
    ActionIcon: ArrowIcon,
    actionLabel: "View Class",
    unavailableLabel: "Coming soon",
    unavailableTitle: "This class is not available yet",
    isExternal: false,
    isInternal: true,
    getMeta: ({ date, instructor }) => [date, instructor],
  },
};

/**
 * A resource row: icon tile, title/description/meta and a call-to-action.
 *
 * @param {'document' | 'video' | 'recitation'} variant - controls icon, accent colour, meta and action.
 * @param {object} file - resource data (see src/data/*).
 */
function FileCard({ file, variant = "document" }) {
  const config = VARIANTS[variant] ?? VARIANTS.document;
  const { Icon, ActionIcon } = config;
  const { number, title, description, url } = file;

  const isAvailable = Boolean(url) && url !== "#";
  const meta = config.getMeta(file).filter(Boolean).join(" · ");

  const linkProps = config.isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : config.isInternal
      ? { "data-internal-link": true }
      : { download: true };

  return (
    <article className={`${styles.card} ${config.className}`}>
      <div className={styles.icon}>
        <Icon />
        {number && <span className={styles.number}>{number}</span>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {meta && <p className={styles.meta}>{meta}</p>}
      </div>

      {isAvailable ? (
        <a
          className={styles.action}
          href={url}
          aria-label={`${config.actionLabel} ${title}`}
          {...linkProps}
        >
          <ActionIcon
            className={ActionIcon === ArrowIcon ? styles.arrowIcon : undefined}
          />
          {config.actionLabel}
        </a>
      ) : (
        <span
          className={`${styles.action} ${styles.disabled}`}
          aria-disabled="true"
          title={config.unavailableTitle}
        >
          {config.unavailableLabel}
        </span>
      )}
    </article>
  );
}

export default FileCard;
