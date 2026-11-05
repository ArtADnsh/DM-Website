import TeamMembers from '../../components/TeamMembers/TeamMembers';
import { teamCategories } from '../../data/teamMembers';
import { siteInfo } from '../../data/site';
import styles from './TAs.module.css';

function TAs() {
  return (
    <div className={styles.page}>
      <TeamMembers
        eyebrow={siteInfo.courseName}
        title="Teaching Team"
        description="Your instructor and teaching assistants, grouped by responsibility."
        categories={teamCategories}
      />
    </div>
  );
}

export default TAs;
