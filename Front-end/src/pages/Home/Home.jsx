import {
  ImageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BulletIcon,
  AnnouncementIcon,
  ResourceIcon,
} from "../../components/icons";
import { useState, useEffect } from "react";

import { homeContent } from "../../data/homeContent";
import { courseSyllabus } from "../../data/courseSyllabus";
import {
  fetchCourseFiles,
  fetchRecitations,
  fetchAnnouncement,
} from "../../api";
import styles from "./Home.module.css";

function PhotoPlaceholder({ label }) {
  return (
    <div className={styles.photoPlaceholder} aria-hidden="true">
      <ImageIcon />
      <span>{label}</span>
    </div>
  );
}

const SLIDE_DURATION = 4000; // 4 seconds per slide

function Home() {
  const { gallery, course } = homeContent;

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // API Data State
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState(null);
  const [latestRecitation, setLatestRecitation] = useState(null);
  const [latestFiles, setLatestFiles] = useState([]);

  // Fetch API updates on mount. The shared API client keeps deploy URLs configurable.
  useEffect(() => {
    let isMounted = true;

    async function loadUpdates() {
      try {
        const [recitations, files, ann] = await Promise.all([
          fetchRecitations(),
          fetchCourseFiles(),
          fetchAnnouncement(),
        ]);

        if (!isMounted) return;

        if (ann && ann.is_active) {
          setAnnouncement(ann);
        } else {
          setAnnouncement(null);
        }

        if (Array.isArray(recitations)) {
          setLatestRecitation(recitations[0] || null);
        }

        if (Array.isArray(files)) {
          setLatestFiles(files.slice(0, 2));
        }
      } catch (err) {
        console.error("Failed to load home updates:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  // Timer & progress animation loop
  useEffect(() => {
    if (isPaused || gallery.length <= 1) return;

    const intervalStep = 40; // 40ms updates for smooth progress fill
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((slide) => (slide + 1) % gallery.length);
          return 0;
        }
        return prev + (intervalStep / SLIDE_DURATION) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, gallery.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
    setProgress(0);
  };

  const handleDotClick = (idx) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  return (
    <div className={styles.home}>
      {/* HERO SECTION: SLIDESHOW + LATEST UPDATES WIDGET */}
      <section
        className={styles.heroSection}
        aria-label="Classroom gallery and latest updates"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Inside the classroom</p>
            <h2>Classroom Moments & Updates</h2>
          </div>
          <p>
            Explore live class lectures, practice workshops, and stay updated
            with the latest assignments and recitation schedules.
          </p>
        </div>

        <div className={styles.heroGrid}>
          {/* LEFT: SLIDESHOW CAROUSEL WITH SENIOR UI EXPANDING PILL INDICATORS */}
          <div
            className={styles.slideshowContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {gallery.map((photo, index) => (
              <figure
                key={photo.id}
                className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ""}`}
              >
                {photo.src ? (
                  <img src={photo.src} alt={photo.alt} />
                ) : (
                  <PhotoPlaceholder label={photo.label} />
                )}
              </figure>
            ))}

            {/* Clear Minimalist Navigation Arrows */}
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

                {/* ULTRA-CLEAN ELEGANT CIRCULAR TIMER BULLETS IN A FROSTED GLASS CAPSULE */}
                <div className={styles.seniorPillContainer}>
                  {gallery.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    const ringRadius = 8;
                    const circumference = 2 * Math.PI * ringRadius; // ~50.265
                    const strokeDashoffset =
                      circumference - (circumference * progress) / 100;

                    return (
                      <button
                        key={idx}
                        className={`${styles.circleBulletBtn} ${isActive ? styles.activeCircleBullet : ""}`}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
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

          {/* RIGHT: LATEST UPDATES & RECITATIONS WIDGET */}
          <div className={styles.updatesWidget}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetBadge}>LIVE UPDATES</span>
              <h3>Upcoming & Recent</h3>
            </div>

            {/* Recitation Schedule Card or Course Announcement */}
            {isLoading ? (
              <div
                className={`${styles.recitationCard} ${styles.skeletonCard}`}
              >
                <div className={styles.skeletonTag} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
              </div>
            ) : announcement && announcement.is_active ? (
              <div className={`${styles.recitationCard} ${styles.fadeIn}`}>
                <div className={styles.recitationHeader}>
                  <span className={styles.recitationTag}>
                    {announcement.title || "📢 Course Announcement"}
                  </span>
                </div>
                <p className={styles.announcementMessage}>
                  {announcement.message}
                </p>
                {announcement.link ? (
                  <a
                    href={announcement.link}
                    className={styles.recitationLink}
                    {...(announcement.link.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : { "data-internal-link": true })}
                  >
                    {announcement.link_text || "View Details"}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            ) : (
              <div
                className={`${styles.recitationCard} ${styles.noAnnouncementCard} ${styles.fadeIn}`}
              >
                <div className={styles.recitationHeader}>
                  <span className={styles.noAnnouncementTag}>
                    ✨ ALL CAUGHT UP
                  </span>
                </div>
                <h4 className={styles.noAnnouncementTitle}>
                  No Active Announcements!
                </h4>
                <p className={styles.noAnnouncementSubtext}>
                  You're all set. Check back later for class updates, exam
                  notices, or assignment announcements.
                </p>
              </div>
            )}

            {/* Recent Files Download Box */}
            {latestFiles.length > 0 && (
              <div className={styles.recentFilesBox}>
                <span className={styles.filesBoxTitle}>
                  📥 Recent Course Material Downloads
                </span>
                <div className={styles.fileList}>
                  {latestFiles.map((file) => (
                    <div className={styles.fileItem} key={file.id}>
                      <div className={styles.fileMeta}>
                        <strong>{file.title}</strong>
                        <small>
                          {file.description || file.category_display}
                        </small>
                      </div>
                      <a
                        href={file.file_url || file.url}
                        download
                        className={styles.downloadBtn}
                        title="Download PDF"
                      >
                        Download PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COURSE INFORMATION SECTION */}
      <section
        id="lectures"
        className={styles.courseCard}
        aria-labelledby="home-title"
      >
        <div className={styles.courseMain}>
          <p className={styles.eyebrow}>{course.eyebrow}</p>
          <h1 id="home-title" className={styles.title}>
            {course.title}
          </h1>
          <p className={styles.description}>{course.description}</p>
          <p className={styles.secondaryDescription}>
            {course.secondaryDescription}
          </p>

          <div className={styles.features} aria-label="Website resources">
            {course.features.map((feature) => (
              <span key={feature}>
                <AnnouncementIcon />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <aside className={styles.courseFacts} aria-label="Course information">
          <div>
            <span>Instructor</span>
            <strong>{course.professor}</strong>
          </div>
          <div>
            <span>University</span>
            <strong>{course.university}</strong>
          </div>
          <div>
            <span>Department</span>
            <strong>{course.department}</strong>
          </div>
          <div>
            <span>Semester</span>
            <strong>{course.semester}</strong>
          </div>
          <div>
            <span>Lecture Schedule</span>
            <strong>{course.schedule}</strong>
          </div>
          <a href="/tas" data-internal-link>
            Meet the teaching team
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </section>

      {/* INTERACTIVE COURSE SYLLABUS & TOPIC ROADMAP */}
      <section
        id="syllabus"
        className={styles.syllabusSection}
        aria-labelledby="syllabus-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Curriculum Roadmap</p>
            <h2 id="syllabus-title">Course Topics &amp; Core Modules</h2>
          </div>
          <p>
            The 6 core mathematical pillars covered in Discrete Mathematics
            under Dr. Tahaei.
          </p>
        </div>

        <div className={styles.syllabusGrid}>
          {courseSyllabus.map((module) => (
            <article
              key={module.id}
              className={styles.syllabusCard}
              style={{
                "--module-color-light": module.color,
                "--module-color-dark": module.darkColor,
              }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.moduleBadge}>
                  Module {module.number}
                </span>
                <span className={styles.moduleAccentDot} />
              </div>

              <h3 className={styles.moduleTitle}>{module.title}</h3>
              <p className={styles.moduleSubtitle}>{module.subtitle}</p>
              <p className={styles.moduleDesc}>{module.description}</p>

              <div className={styles.topicChips}>
                {module.topics.map((topic) => (
                  <span key={topic} className={styles.chip}>
                    {topic}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <a
                  href="/materials"
                  data-internal-link
                  className={styles.moduleCta}
                >
                  View Materials &amp; Notes
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
