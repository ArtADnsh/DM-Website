import { useState, useEffect } from 'react';
import ResourceList from '../../components/ResourceList/ResourceList';
import { courseMaterials as fallbackMaterials } from '../../data/courseMaterials';
import { fetchCourseFiles } from '../../api';

function CourseMaterials() {
  const [materials, setMaterials] = useState(fallbackMaterials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchCourseFiles();
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setMaterials(data);
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
      title="Course Materials"
      description="Lecture notes, assignments, quizzes, and educational resources"
      items={materials}
      variant="document"
      unit="file"
      emptyMessage={loading ? "Loading course materials..." : "No materials have been published yet."}
    />
  );
}

export default CourseMaterials;
