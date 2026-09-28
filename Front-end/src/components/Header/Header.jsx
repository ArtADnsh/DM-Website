import { useState, useEffect } from 'react';

import dlogo from '../../assets/logo_dark.webp';
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

        const evaluateScroll = () => {
            const scrollY = window.scrollY;

            setIsScrolled((prev) => {
                if (!prev && scrollY > 40) {
                    return true;
                }

                if (prev && scrollY < 20) {
                    return false;
                }

                return prev;
            });

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(evaluateScroll);
            }
        };

        evaluateScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`${styles.header} ${
                isScrolled ? styles.headerScrolled : ''
            }`}
        >
            <div className={styles.container}>
                <div className={styles.courseInfo}>
                    <img
                        src={llogo}
                        alt="IUST Logo"
                        className={styles.logo}
                    />

                    <div>
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
                </div>

                <div className={styles.actions}>
                    <ThemeToggle />

                    <button
                        className={styles.menuButton}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            <div
                className={`${styles.overlay} ${
                    isMenuOpen ? styles.overlayOpen : ''
                }`}
                onClick={closeMenu}
            ></div>

            <nav
                className={`${styles.menu} ${
                    isMenuOpen ? styles.menuOpen : ''
                }`}
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

                <a href="/" onClick={closeMenu}>
                    Home
                </a>

                <a href="#lectures" onClick={closeMenu}>
                    Lectures
                </a>

                <a href="#videos" onClick={closeMenu}>
                    Videos
                </a>

                <a href="#tas" onClick={closeMenu}>
                    TAs
                </a>

                <a href="#mentors" onClick={closeMenu}>
                    Mentors
                </a>

                <a href="#materials" onClick={closeMenu}>
                    Materials
                </a>
            </nav>
        </header>
    );
}

export default Header;