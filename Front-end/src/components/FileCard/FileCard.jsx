import styles from './FileCard.module.css';

function iconProps() {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
}

function DocumentIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v6h5" />
      <path d="M9 14h6M9 18h4" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg {...iconProps()} strokeWidth={2}>
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg {...iconProps()} strokeWidth={2}>
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  );
}

function ClassIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12H7.5A2.5 2.5 0 0 1 5 16.5z" />
      <path d="M8 8h7M8 12h7" />
      <path d="M18 8.5h1A1.5 1.5 0 0 1 20.5 10v7.5A1.5 1.5 0 0 1 19 19h-1" />
    </svg>
  );
}

function ArrowIcon({ className }) {
  return (
    <svg {...iconProps()} strokeWidth={2} className={className}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

const VARIANTS = {
  document: {
    className: styles.document,
    Icon: DocumentIcon,
    ActionIcon: DownloadIcon,
    actionLabel: 'Download',
    unavailableLabel: 'Coming soon',
    unavailableTitle: 'This file has not been uploaded yet',
    isExternal: false,
    getMeta: ({ type, size }) => [type, size],
  },
  video: {
    className: styles.video,
    Icon: VideoIcon,
    ActionIcon: PlayIcon,
    actionLabel: 'Watch',
    unavailableLabel: 'Coming soon',
    unavailableTitle: 'This recording has not been published yet',
    isExternal: true,
    isInternal: false,
    getMeta: ({ duration, instructor }) => ['Video', duration, instructor],
  },
  recitation: {
    className: styles.recitation,
    Icon: ClassIcon,
    ActionIcon: ArrowIcon,
    actionLabel: 'View Class',
    unavailableLabel: 'Coming soon',
    unavailableTitle: 'This class is not available yet',
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
function FileCard({ file, variant = 'document' }) {
  const config = VARIANTS[variant] ?? VARIANTS.document;
  const { Icon, ActionIcon } = config;
  const { number, title, description, url } = file;

  const isAvailable = Boolean(url) && url !== '#';
  const meta = config.getMeta(file).filter(Boolean).join(' · ');

  const linkProps = config.isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : config.isInternal
      ? { 'data-internal-link': true }
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
