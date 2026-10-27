import { ROUTES } from "../../data/routes";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className={styles.card}>
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 id="not-found-title" className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <a className={styles.homeLink} href={ROUTES.home.path} data-internal-link>
          Back to home <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default NotFound;
