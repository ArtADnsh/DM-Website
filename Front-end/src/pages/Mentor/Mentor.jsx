import { mentorAssignments } from '../../data/mentors';
import styles from './Mentor.module.css';

function Mentor() {
  return (
    <div className={styles.page}>
      <section className={styles.panel} aria-labelledby="mentor-title">
        <header className={styles.header}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>Student Support</p>
            <h1 id="mentor-title" className={styles.title}>Mentor Assignments</h1>
            <p className={styles.description}>
              The current mentor assignments for students in Discrete Mathematics.
            </p>
          </div>

          <div className={styles.count} aria-label={`${mentorAssignments.length} students`}>
            <strong>{mentorAssignments.length}</strong>
            <span>students</span>
          </div>
        </header>

        <div className={styles.tableShell}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              List of students and their assigned mentors
            </caption>
            <colgroup>
              <col className={styles.indexColumn} />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Student Name</th>
                <th scope="col">Mentor</th>
              </tr>
            </thead>
            <tbody>
              {mentorAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className={styles.rowNumber}>{assignment.id}</td>
                  <td>
                    <span className={styles.personName}>{assignment.student}</span>
                  </td>
                  <td>
                    <span className={styles.mentorName}>{assignment.mentor}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Mentor;
