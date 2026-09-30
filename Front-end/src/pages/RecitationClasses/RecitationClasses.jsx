import ResourceList from '../../components/ResourceList/ResourceList';
import { recitationClasses } from '../../data/recitationClasses';

function RecitationClasses() {
  const classes = recitationClasses.map((item) => ({
    ...item,
    url: `/recitations/${item.id}`,
  }));

  return (
    <ResourceList
      eyebrow="Discrete Mathematics"
      title="Recitation Classes"
      description="Problem-solving classes, worksheets, solutions, and recordings — organized session by session."
      items={classes}
      variant="recitation"
      unit="class"
      emptyMessage="No recitation classes have been published yet."
    />
  );
}

export default RecitationClasses;
