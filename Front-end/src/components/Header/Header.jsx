import { useEffect, useState } from 'react';

import llogo from '../../assets/logo_light.webp';
import styles from './Header.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    let compact = window.scrollY > 40;

    setIsScrolled(compact);

    const evaluateScroll = () => {
      const scrollY = window.scrollY;

      const nextCompact = compact
        ? scrollY > 20
        : scrollY > 40;

      if (nextCompact !== compact) {
        compact = nextCompact;
        setIsScrolled(nextCompact);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(evaluateScroll);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : ''
      }`}
    >
      <div className={styles.container}>
        <a
          className={styles.courseInfo}
          href="/"
          data-internal-link
          aria-label="Discrete Mathematics home"
        >
          <img
            src={llogo}
            alt="IUST Logo"
            className={styles.logo}
          />

          <div className={styles.courseText}>
            <p className={styles.university}>
              Iran University of Science and Technology
            </p>

            <h1 className={styles.courseName}>
              Discrete Mathematics
            </h1>

            <p className={styles.semester}>
              Semester 4051
            </p>
          </div>
        </a>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <button
        className={`${styles.overlay} ${
          isMenuOpen ? styles.overlayOpen : ''
        }`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={isMenuOpen ? 0 : -1}
      />

      <nav
        id="site-navigation"
        className={`${styles.menu} ${
          isMenuOpen ? styles.menuOpen : ''
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.menuHeader}>
          <span>Navigation</span>

          <button
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <a
          href="/"
          data-internal-link
          onClick={closeMenu}
        >
          Home
        </a>

        <a href="/#lectures" onClick={closeMenu}>
          Lectures
        </a>

        <a href="/#videos" onClick={closeMenu}>
          Videos
        </a>

        <a
          href="/tas"
          data-internal-link
          onClick={closeMenu}
        >
          TAs
        </a>

        <a href="/#mentors" onClick={closeMenu}>
          Mentors
        </a>

        <a href="/#materials" onClick={closeMenu}>
          Materials
        </a>
      </nav>
    </header>
  );
}

export default Header;