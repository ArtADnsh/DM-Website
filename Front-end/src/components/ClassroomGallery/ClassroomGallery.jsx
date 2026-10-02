import { useEffect, useState } from "react";
import {
  ImageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BulletIcon,
} from "../icons";
import styles from "./ClassroomGallery.module.css";

const SLIDE_DURATION = 4000;

function PhotoPlaceholder({ label }) {
  return (
    <div className={styles.photoPlaceholder} aria-hidden="true">
      <ImageIcon />
      <span>{label}</span>
    </div>
  );
}

function ClassroomGallery({ gallery = [] }) {
  const [{ currentSlide, progress }, setSlide] = useState({
    currentSlide: 0,
    progress: 0,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMotionChange = () => setReducedMotion(media.matches);
    const onVisibilityChange = () => setIsHidden(document.hidden);

    media.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      media.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      isHovered ||
      isFocused ||
      isHidden ||
      reducedMotion ||
      gallery.length <= 1
    ) {
      return;
    }

    let previousTime = performance.now();

    const timer = setInterval(() => {
      const now = performance.now();
      const elapsed = now - previousTime;
      previousTime = now;

      setSlide((previous) => {
        const nextProgress =
          previous.progress + (elapsed / SLIDE_DURATION) * 100;

        return nextProgress >= 100
          ? {
            currentSlide: (previous.currentSlide + 1) % gallery.length,
            progress: 0,
          }
          : { ...previous, progress: nextProgress };
      });
    }, 40);

    return () => clearInterval(timer);
  }, [isHovered, isFocused, isHidden, reducedMotion, gallery.length]);

  const handleNextSlide = () => {
    setSlide((previous) => ({
      currentSlide: (previous.currentSlide + 1) % gallery.length,
      progress: 0,
    }));
  };

  const handlePrevSlide = () => {
    setSlide((previous) => ({
      currentSlide:
        (previous.currentSlide - 1 + gallery.length) % gallery.length,
      progress: 0,
    }));
  };

  const handleDotClick = (currentSlide) => {
    setSlide({ currentSlide, progress: 0 });
  };

  if (!gallery.length) return null;

  return (
    <div
      className={styles.slideshowContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      {gallery.map((photo, index) => (
        <figure
          key={photo.id}
          className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ""
            }`}
          aria-hidden={index !== currentSlide}
        >
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.alt}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ) : (
            <PhotoPlaceholder label={photo.label} />
          )}
        </figure>
      ))}

      {gallery.length > 1 && (
        <>
          <button
            className={`${styles.carouselArrow} ${styles.prevArrow}`}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>

          <button
            className={`${styles.carouselArrow} ${styles.nextArrow}`}
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>

          <div className={styles.seniorPillContainer}>
            {gallery.map((_, idx) => {
              const isActive = idx === currentSlide;
              const ringRadius = 8;
              const circumference = 2 * Math.PI * ringRadius;
              const strokeDashoffset =
                circumference - (circumference * progress) / 100;

              return (
                <button
                  key={idx}
                  className={`${styles.circleBulletBtn} ${isActive ? styles.activeCircleBullet : ""
                    }`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <BulletIcon
                    className={styles.bulletSvg}
                    isActive={isActive}
                    ringRadius={ringRadius}
                    circumference={circumference}
                    strokeDashoffset={strokeDashoffset}
                    centerDotClassName={styles.centerDot}
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ClassroomGallery;