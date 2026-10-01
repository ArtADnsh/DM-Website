import { useState, useEffect } from 'react';

import { homeContent } from '../../data/homeContent';
import { courseSyllabus } from '../../data/courseSyllabus';
import { fetchCourseFiles, fetchRecitations, fetchAnnouncement } from '../../api';
import styles from './Home.module.css';


function PhotoPlaceholder({ label }) {
  return (
    <div className={styles.photoPlaceholder} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="m5 18 4.5-4.5 3.2 3.2 2.1-2.1L19 18" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function ResourceIcon({ type }) {
  if (type === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
        <path d="m9.7 13.9 4.2-3.8" />
      </svg>
    );
  }

  if (type === 'code') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

// Default fallback data if API server is offline
const FALLBACK_RECITATION = {
  title: 'Recitation Session 1: Mathematical Logic & Induction',
  date_time: 'Mondays, 14:00 - 16:00',
  location_or_link: 'Classroom 102 (Live & Skyroom)',
  video_url: 'https://lms.univ.ac.ir/recitations/session1',
};

const FALLBACK_FILES = [
  {
    id: 40,
    title: 'Discrete Mathematics and Its Applications (8th Edition)',
    description: 'Kenneth H. Rosen Textbook',
    file_url: '/materials/notes/Discrete_Mathematics_and_Its_Applications.pdf',
    category_display: 'Reference',
  },
  {
    id: 41,
    title: 'Slide 00: Course Introduction & Overview',
    description: 'Course Logistics & Grading Policy',
    file_url: '/materials/notes/Introduction.pdf',
    category_display: 'Lecture Notes',
  },
];

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
  const [latestRecitation, setLatestRecitation] = useState(FALLBACK_RECITATION);
  const [latestFiles, setLatestFiles] = useState(FALLBACK_FILES);

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

        if (Array.isArray(recitations) && recitations.length > 0) {
          setLatestRecitation(recitations[0]);
        }

        if (Array.isArray(files) && files.length > 0) {
          setLatestFiles(files.slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to load home updates:', err);
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
      <section className={styles.heroSection} aria-label="Classroom gallery and latest updates">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Inside the classroom</p>
            <h2>Classroom Moments & Updates</h2>
          </div>
          <p>
            Explore live class lectures, practice workshops, and stay updated with the latest assignments and recitation schedules.
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
                className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  className={`${styles.carouselArrow} ${styles.nextArrow}`}
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* ULTRA-CLEAN ELEGANT CIRCULAR TIMER BULLETS IN A FROSTED GLASS CAPSULE */}
                <div className={styles.seniorPillContainer}>
                  {gallery.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    const ringRadius = 8;
                    const circumference = 2 * Math.PI * ringRadius; // ~50.265
                    const strokeDashoffset = circumference - (circumference * progress) / 100;

                    return (
                      <button
                        key={idx}
                        className={`${styles.circleBulletBtn} ${isActive ? styles.activeCircleBullet : ''}`}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <svg viewBox="0 0 24 24" className={styles.bulletSvg}>
                          {isActive ? (
                            <>
                              {/* Subtle hairline track ring */}
                              <circle
                                cx="12"
                                cy="12"
                                r={ringRadius}
                                stroke="rgba(255, 255, 255, 0.25)"
                                strokeWidth="1.5"
                                fill="none"
                              />
                              {/* Crisp white countdown stroke ring */}
                              <circle
                                cx="12"
                                cy="12"
                                r={ringRadius}
                                stroke="#ffffff"
                                strokeWidth="1.8"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                              />
                              {/* Active solid white center dot */}
                              <circle
                                cx="12"
                                cy="12"
                                r="3.5"
                                fill="#ffffff"
                              />
                            </>
                          ) : (
                            /* Inactive bullet dot */
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                              className={styles.centerDot}
                            />
                          )}
                        </svg>
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
              <div className={`${styles.recitationCard} ${styles.skeletonCard}`}>
                <div className={styles.skeletonTag} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
              </div>
            ) : announcement && announcement.is_active ? (
              <div className={`${styles.recitationCard} ${styles.fadeIn}`}>
                <div className={styles.recitationHeader}>
                  <span className={styles.recitationTag}>{announcement.title || '📢 Course Announcement'}</span>
                </div>
                <p className={styles.announcementMessage}>{announcement.message}</p>
                {announcement.link ? (
                  <a
                    href={announcement.link}
                    className={styles.recitationLink}
                    {...(announcement.link.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : { 'data-internal-link': true })}
                  >
                    {announcement.link_text || 'View Details'}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            ) : (
              <div className={`${styles.recitationCard} ${styles.noAnnouncementCard} ${styles.fadeIn}`}>
                <div className={styles.recitationHeader}>
                  <span className={styles.noAnnouncementTag}>✨ ALL CAUGHT UP</span>
                </div>
                <h4 className={styles.noAnnouncementTitle}>No Active Announcements!</h4>
                <p className={styles.noAnnouncementSubtext}>
                  You're all set. Check back later for class updates, exam notices, or assignment announcements.
                </p>
              </div>
            )}

            {/* Recent Files Download Box */}
            <div className={styles.recentFilesBox}>
              <span className={styles.filesBoxTitle}>📥 Recent Course Material Downloads</span>
              <div className={styles.fileList}>
                {latestFiles.map((file) => (
                  <div className={styles.fileItem} key={file.id}>
                    <div className={styles.fileMeta}>
                      <strong>{file.title}</strong>
                      <small>{file.description || file.category_display}</small>
                    </div>
                    <a
                      href={file.file_url}
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
          </div>
        </div>
      </section>

      {/* COURSE INFORMATION SECTION */}
      <section id="lectures" className={styles.courseCard} aria-labelledby="home-title">
        <div className={styles.courseMain}>
          <p className={styles.eyebrow}>{course.eyebrow}</p>
          <h1 id="home-title" className={styles.title}>
            {course.title}
          </h1>
          <p className={styles.description}>{course.description}</p>
          <p className={styles.secondaryDescription}>{course.secondaryDescription}</p>

          <div className={styles.features} aria-label="Website resources">
            {course.features.map((feature) => (
              <span key={feature}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="m5 10 3 3 7-7" />
                </svg>
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
      <section id="syllabus" className={styles.syllabusSection} aria-labelledby="syllabus-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Curriculum Roadmap</p>
            <h2 id="syllabus-title">Course Topics &amp; Core Modules</h2>
          </div>
          <p>
            The 6 core mathematical pillars covered in Discrete Mathematics under Dr. Tahaei.
          </p>
        </div>

        <div className={styles.syllabusGrid}>
          {courseSyllabus.map((module) => (
            <article
              key={module.id}
              className={styles.syllabusCard}
              style={{ '--module-color-light': module.color, '--module-color-dark': module.darkColor }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.moduleBadge}>Module {module.number}</span>
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
                <a href="/materials" data-internal-link className={styles.moduleCta}>
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