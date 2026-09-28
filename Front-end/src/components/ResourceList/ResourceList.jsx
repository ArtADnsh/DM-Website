import FileCard from '../FileCard/FileCard';
import styles from './ResourceList.module.css';

/**
 * Shared layout for resource pages (course materials, tutorial sessions…).
 * Renders a page heading with an item counter and a list of <FileCard />.
 */
function ResourceList({
  eyebrow,
  title,
  description,
  items = [],
  variant = 'document',
  unit = 'file',
  emptyMessage = 'Nothing has been published yet.',
}) {
  const count = items.length;
  const countLabel = count === 1 ? unit : `${unit}s`;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.subtitle}>{description}</p>}
        </div>

        <div className={styles.count} aria-label={`${count} ${countLabel}`}>
          <strong>{count}</strong>
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
