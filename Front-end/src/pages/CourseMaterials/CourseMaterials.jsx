import ResourceList from '../../components/ResourceList/ResourceList';
import { courseMaterials } from '../../data/courseMaterials';

function CourseMaterials() {
  return (
    <ResourceList
      eyebrow="Discrete Mathematics"
      title="Course Materials"
      description="Lecture notes and educational resources"
      items={courseMaterials}
      variant="document"
      unit="file"
      emptyMessage="No materials have been published yet."
    />
  );
}

export default CourseMaterials;
