import TeamMembers from '../../components/TeamMembers/TeamMembers';
import { teamCategories } from '../../data/teamMembers';
import styles from './TAs.module.css';

function TAs() {
  return (
    <div className={styles.page}>
      <TeamMembers
        eyebrow="Discrete Mathematics"
        title="Teaching Team"
        description="Meet the professor, head TAs, and specialized teaching teams supporting Discrete Mathematics throughout the semester."
        categories={teamCategories}
      />
    </div>
  );
}

export default TAs;
