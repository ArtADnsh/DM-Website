import { homeContent } from '../../data/homeContent';
import styles from './Home.module.css';

function PhotoPlaceholder({ label }) {
  return (
    <div className={styles.photoPlaceholder} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
        <path d="m9.7 13.9 4.2-3.8" />
      </svg>
    );
  }

  if (type === 'code') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

function Home() {
  const { gallery, course, links } = homeContent;

  return (
    <div className={styles.home}>
      <section
        className={styles.gallerySection}
        aria-labelledby="gallery-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Inside the classroom</p>
            <h2 id="gallery-title">Class moments</h2>
          </div>

          <p>
            A small look at lectures, problem-solving sessions, and the course
            community.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {gallery.map((photo) => (
            <figure className={styles.galleryCard} key={photo.id}>
              {photo.src ? (
                <img src={photo.src} alt={photo.alt} />
              ) : (
                <PhotoPlaceholder label={photo.label} />
              )}

              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

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

          <p className={styles.description}>
            {course.description}
          </p>

          <p className={styles.secondaryDescription}>
            {course.secondaryDescription}
          </p>

          <div
            className={styles.features}
            aria-label="Website resources"
          >
            {course.features.map((feature) => (
              <span key={feature}>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="m5 10 3 3 7-7" />
                </svg>

                {feature}
              </span>
            ))}
          </div>
        </div>

        <aside
          className={styles.courseFacts}
          aria-label="Course information"
        >
          <div>
            <span>Instructor</span>
            <strong>{course.professor}</strong>
          </div>

          <div>
            <span>University</span>
            <strong>{course.university}</strong>
          </div>

          <div>
            <span>Semester</span>
            <strong>{course.semester}</strong>
          </div>

          <a href="/tas" data-internal-link>
            Meet the teaching team
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </section>

      <section
        id="links"
        className={styles.resourcesSection}
        aria-labelledby="resources-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Course community</p>
            <h2 id="resources-title">Useful links</h2>
          </div>

          <p>
            Quick access to the platforms used for announcements, discussion,
            and assignments.
          </p>
        </div>

        <div className={styles.resourceGrid}>
          {links.map((link) => (
            <a
              className={styles.resourceCard}
              href={link.url}
              key={link.id}
              target={link.url !== '#' ? '_blank' : undefined}
              rel={link.url !== '#' ? 'noreferrer' : undefined}
              aria-disabled={link.url === '#' ? 'true' : undefined}
              onClick={
                link.url === '#'
                  ? (event) => event.preventDefault()
                  : undefined
              }
            >
              <span className={styles.resourceIcon}>
                <ResourceIcon type={link.icon} />
              </span>

              <span className={styles.resourceCopy}>
                <strong>{link.title}</strong>
                <small>{link.description}</small>
              </span>

              <span
                className={styles.resourceArrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;