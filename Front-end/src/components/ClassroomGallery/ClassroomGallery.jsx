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
  const [{ currentSlide, cycle }, setSlide] = useState({
    currentSlide: 0,
    cycle: 0,
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

  const isPaused =
    isHovered || isFocused || isHidden || reducedMotion || gallery.length <= 1;

  const handleNextSlide = () => {
    setSlide((previous) => ({
      currentSlide: (previous.currentSlide + 1) % gallery.length,
      cycle: previous.cycle + 1,
    }));
  };

  const handlePrevSlide = () => {
    setSlide((previous) => ({
      currentSlide:
        (previous.currentSlide - 1 + gallery.length) % gallery.length,
      cycle: previous.cycle + 1,
    }));
  };

  const handleDotClick = (currentSlide) => {
    setSlide((previous) => ({
      currentSlide,
      cycle: previous.cycle + 1,
    }));
  };

  const handleProgressEnd = () => {
    if (!isPaused) handleNextSlide();
  };

  if (!gallery.length) return null;

  return (
    <div
      className={styles.slideshowContainer}
      data-paused={isPaused}
      style={{ "--slide-duration": `${SLIDE_DURATION}ms` }}
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
              loading={index === 0 ? "eager" : "lazy"}
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
                    key={isActive ? cycle : "inactive"}
                    className={styles.bulletSvg}
                    style={{ "--ring-circumference": circumference }}
                    onAnimationEnd={isActive ? handleProgressEnd : undefined}
                    isActive={isActive}
                    ringRadius={ringRadius}
                    circumference={circumference}
                    strokeDashoffset={circumference}
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