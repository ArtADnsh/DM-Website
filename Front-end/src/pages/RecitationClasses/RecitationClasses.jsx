import { useEffect, useState } from 'react';
import ResourceList from '../../components/ResourceList/ResourceList';
import { fetchRecitations } from '../../api';

function RecitationClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function loadData() {
      try {
        const data = await fetchRecitations({ signal: controller.signal });
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
      controller.abort();
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
      unit="Class"
      pluralUnit="Classes"
      emptyMessage={loading ? "Loading recitation classes..." : "No recitation classes have been published yet."}
    />
  );
}

export default RecitationClasses;
