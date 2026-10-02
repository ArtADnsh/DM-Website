import {
  AnnouncementIcon,
} from "../../components/icons";
import { useState, useEffect } from "react";

import ClassroomGallery from "../../components/ClassroomGallery/ClassroomGallery";
import { homeContent } from "../../data/homeContent";
import { courseSyllabus } from "../../data/courseSyllabus";
import {
  fetchCourseFiles,
  fetchRecitations,
  fetchAnnouncement,
} from "../../api";
import styles from "./Home.module.css";

function Home() {
  const { gallery, course } = homeContent;

  // API Data State
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState(null);
  const [latestRecitation, setLatestRecitation] = useState(null);
  const [latestFiles, setLatestFiles] = useState([]);

  // Fetch API updates on mount. The shared API client keeps deploy URLs configurable.
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadUpdates() {
      try {
        const [recitations, files, ann] = await Promise.all([
          fetchRecitations({ signal: controller.signal }),
          fetchCourseFiles(null, { signal: controller.signal }),
          fetchAnnouncement({ signal: controller.signal }),
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
      controller.abort();
    };
  }, []);

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
            <h2>Classroom and updates</h2>
          </div>
          <p>
            Class photos, course announcements, and recently added materials.
          </p>
        </div>

        <div className={styles.heroGrid}>
          {/* LEFT: SLIDESHOW CAROUSEL WITH SENIOR UI EXPANDING PILL INDICATORS */}
          <ClassroomGallery gallery={gallery} />

          {/* RIGHT: LATEST UPDATES & RECITATIONS WIDGET */}
          <div className={styles.updatesWidget}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetBadge}>LIVE UPDATES</span>
              <h3>Upcoming & Recent</h3>
            </div>

            {/* Recitation Schedule Card or Course Announcement */}
            {isLoading ? (
              <div
                role="status"
                aria-label="Loading course updates"
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
                    {announcement.title || "📢 Course announcement"}
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
                    {announcement.link_text || "View details"}
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
                  No announcements right now
                </h4>
                <p className={styles.noAnnouncementSubtext}>
                  New course announcements will appear here.
                </p>
              </div>
            )}

            {/* Recent Files Download Box */}
            {latestFiles.length > 0 && (
              <div className={styles.recentFilesBox}>
                <span className={styles.filesBoxTitle}>
                  📥 Recent materials
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
                        aria-label={`Download ${file.title}`}
                      >
                        Download
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
            <span>Lecture schedule</span>
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
            <p className={styles.eyebrow}>Syllabus</p>
            <h2 id="syllabus-title">Course topics</h2>
          </div>
          <p>
            The modules covered this semester, with the topics in each.
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
                  View materials
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
