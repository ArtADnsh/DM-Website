import styles from "./CountBadge.module.css";

/**
 * Bordered "24 Members" counter used in page headers.
 *
 * @param {string} ariaLabel - full accessible description of the count.
 * @param {boolean} [busy] - sets aria-busy while the value is loading.
 * @param {boolean} [valueHidden] - hide the number from screen readers (ariaLabel already covers it).
 */
function CountBadge({ value, label, ariaLabel, busy, valueHidden = false }) {
  return (
    <div className={styles.count} aria-busy={busy} aria-label={ariaLabel}>
      <strong aria-hidden={valueHidden ? "true" : undefined}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default CountBadge;
