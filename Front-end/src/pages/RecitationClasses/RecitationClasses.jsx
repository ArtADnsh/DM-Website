import { useEffect, useState } from 'react';
import ResourceList from '../../components/ResourceList/ResourceList';
import { recitationClasses as fallbackClasses } from '../../data/recitationClasses';
import { fetchRecitations } from '../../api';

function RecitationClasses() {
  const [classes, setClasses] = useState(fallbackClasses);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchRecitations();
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setClasses(data);
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
      emptyMessage="No recitation classes have been published yet."
    />
  );
}

export default RecitationClasses;
