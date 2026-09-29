import FileCard from '../../components/FileCard/FileCard';
import { projectFiles, projectInfo } from '../../data/project';
import styles from './Project.module.css';

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6.5 12.5 3.2 3.2 7.8-8" />
    </svg>
  );
}

function Project() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{projectInfo.eyebrow}</p>
          <h1>{projectInfo.title}</h1>
          <p className={styles.description}>{projectInfo.description}</p>

          <span className={styles.status}>{projectInfo.status}</span>
        </div>

        <div className={styles.detailsCard} aria-label="Project overview">
          {projectInfo.details.map((detail) => (
            <div className={styles.detail} key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.brief} aria-labelledby="project-guidelines-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>Overview</p>
            <h2 id="project-guidelines-title">Project Guidelines</h2>
          </div>
          <p>
            The final brief will include the exact topic options, grading rubric, and submission timeline.
          </p>
        </div>

        <div className={styles.guidelines}>
          {projectInfo.notes.map((note) => (
            <div className={styles.guideline} key={note}>
              <span className={styles.checkIcon}><CheckIcon /></span>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.filesSection} aria-labelledby="project-files-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>Downloads</p>
            <h2 id="project-files-title">Project Files</h2>
          </div>
          <p>
            Project documents will appear here as soon as they are published.
          </p>
        </div>

        <div className={styles.fileList}>
          {projectFiles.map((file) => (
            <FileCard key={file.id} file={file} variant="document" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Project;
