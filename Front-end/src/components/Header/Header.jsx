import { navigationLinks } from "../../data/navigation";
import { MenuIcon, CloseIcon } from "../icons";
import { useEffect, useRef, useState } from "react";

import logoLight from "../../assets/logo_light.webp";
import logoDark from "../../assets/logo_dark.webp";
import styles from "./Header.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Header() {
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
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
    let animationFrame;
    let compact = window.scrollY > 40;

    setIsScrolled(compact);

    const evaluateScroll = () => {
      const scrollY = window.scrollY;

      const nextCompact = compact ? scrollY > 20 : scrollY > 40;

      if (nextCompact !== compact) {
        compact = nextCompact;
        setIsScrolled(nextCompact);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      animationFrame = requestAnimationFrame(evaluateScroll);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) menu.inert = !isMenuOpen;
    if (!isMenuOpen) return undefined;
    menu?.querySelector('a')?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
      }
      if (event.key === "Tab") {
        const controls = menu?.querySelectorAll('button, a[href]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.container}>
        <a
          className={styles.courseInfo}
          href="/"
          data-internal-link
          aria-label="Discrete Mathematics home"
        >
          <img
            src={logoLight}
            alt="IUST Logo"
            className={`${styles.logo} ${styles.logoLight}`}
          />
          <img
            src={logoDark}
            alt="IUST Logo"
            className={`${styles.logo} ${styles.logoDark}`}
          />

          <div className={styles.courseText}>
            <p className={styles.university}>
              Iran University of Science and Technology
            </p>

            <p className={styles.courseName}>Discrete Mathematics</p>

            <p className={styles.semester}>Semester 4051</p>
          </div>
        </a>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
          >
            <MenuIcon className={styles.menuIcon} />
          </button>
        </div>

        {/* NAVIGATION DROPDOWN ANCHORED INSIDE CONTAINER */}
        <nav
          ref={menuRef}
          id="site-navigation"
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen}
        >
          <div className={styles.menuHeader}>
            <span>Navigation</span>

            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {navigationLinks.map((item) => {
            const currentPath =
              window.location.pathname.replace(/\/+$/, "") || "/";
            const isActive = item.isActive(currentPath);

            return (
              <a
                key={item.href}
                href={item.href}
                data-internal-link
                onClick={closeMenu}
                className={isActive ? styles.activeLink : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <button
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={-1}
      />
    </header>
  );
}

export default Header;
