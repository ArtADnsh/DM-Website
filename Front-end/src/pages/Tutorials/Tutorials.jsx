import { useState, useEffect } from 'react';
import ResourceList from '../../components/ResourceList/ResourceList';
import { tutorialSessions as fallbackSessions } from '../../data/tutorialSessions';
import { fetchRecitations } from '../../api';

function Tutorials() {
  const [sessions, setSessions] = useState(fallbackSessions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchRecitations();
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setSessions(data);
      }
      if (isMounted) {
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ResourceList
      eyebrow="Discrete Mathematics"
      title="Tutorial Sessions"
      description="Recorded problem-solving classes led by the teaching assistants"
      items={sessions}
      variant="video"
      unit="session"
      emptyMessage={loading ? "Loading video recordings..." : "No tutorial recordings have been published yet."}
    />
  );
}

export default Tutorials;
