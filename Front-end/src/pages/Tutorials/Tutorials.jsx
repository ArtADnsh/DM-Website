import ResourceList from '../../components/ResourceList/ResourceList';
import { tutorialSessions } from '../../data/tutorialSessions';

function Tutorials() {
  return (
    <ResourceList
      eyebrow="Discrete Mathematics"
      title="Tutorial Sessions"
      description="Recorded problem-solving classes led by the teaching assistants"
      items={tutorialSessions}
      variant="video"
      unit="session"
      emptyMessage="No tutorial recordings have been published yet."
    />
  );
}

export default Tutorials;
