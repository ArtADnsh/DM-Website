import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h2>Discrete Mathematics</h2>
          <p>
            Iran University of Science and Technology
          </p>
        </div>

        <p className={styles.copyright}>
          © 2026 Discrete Mathematics
        </p>
      </div>
    </footer>
  );
}

export default Footer;