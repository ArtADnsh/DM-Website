import { useEffect, useState } from 'react';
import ResourceList from '../../components/ResourceList/ResourceList';
import { fetchRecitations } from '../../api';

function RecitationClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchRecitations();
        if (isMounted && Array.isArray(data)) {
          setClasses(data);
        }
      } catch (err) {
        console.error('Failed to fetch recitations:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const items = classes.map((item) => ({
    ...item,
    date: item.date || item.date_time,
    url: `/recitations/${item.id}`,
  }));

  return (
    <ResourceList
      eyebrow="Discrete Mathematics"
      title="Recitation Classes"
      description="Problem-solving classes, worksheets, solutions, and recordings — organized session by session."
      items={items}
      variant="recitation"
      unit="class"
      emptyMessage={loading ? "Loading recitation classes..." : "No recitation classes have been published yet."}
    />
  );
}

export default RecitationClasses;
