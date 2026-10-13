import FileCard from '../FileCard/FileCard';
import styles from './ResourceList.module.css';

/**
 * Shared layout for resource pages (course materials, tutorial sessions…).
 * Renders a page heading with an item counter and a list of <FileCard />.
 */
function ResourceList({
  title,
  description,
  items = [],
  variant = 'document',
  unit = 'file',
  pluralUnit = `${unit}s`,
  loading = false,
  loadFailed = false,
  emptyMessage = 'Nothing has been published yet.',
}) {
  const count = items.length;
  const countLabel = count === 1 ? unit : pluralUnit;
  const countReady = !loading && !loadFailed;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.subtitle}>{description}</p>}
        </div>

        <div
          className={styles.count}
          aria-busy={loading}
          aria-label={
            loading
              ? `Loading ${pluralUnit.toLowerCase()} count`
              : loadFailed
                ? `${pluralUnit} count unavailable`
                : `${count} ${countLabel}`
          }
        >
          <strong aria-hidden="true">{countReady ? count : '—'}</strong>
          <span>{countLabel}</span>
        </div>
      </header>

      {count > 0 ? (
        <section className={styles.list} aria-label={title}>
          {items.map((item) => (
            <FileCard key={item.id} file={item} variant={variant} />
          ))}
        </section>
      ) : (
        <div className={styles.empty}>{emptyMessage}</div>
      )}
    </div>
  );
}

export default ResourceList;
