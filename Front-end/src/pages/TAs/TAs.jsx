import TeamMembers from '../../components/TeamMembers/TeamMembers';
import { teamMembers } from '../../data/teamMembers';
import styles from './TAs.module.css';

function TAs() {
  return (
    <div className={styles.page}>
      <TeamMembers
        eyebrow="Discrete Mathematics"
        title="Teaching Team"
        description="Meet the instructor and teaching assistants supporting lectures, tutorials, assignments, and student questions throughout the semester."
        members={teamMembers}
      />
    </div>
  );
}

export default TAs;
