import ResourceList from '../../components/ResourceList/ResourceList';
import { fetchRecitations } from '../../api';
import { useApiData } from '../../hooks/useApiData';
import { recitationPath } from '../../data/routes';

function RecitationClasses() {
  const { data, loading, failed } = useApiData(fetchRecitations);

  const items = (data ?? []).map((item) => ({
    ...item,
    date: item.date || item.date_time,
    url: recitationPath(item.id),
  }));

  return (
    <ResourceList
      title="Recitation Classes"
      description="Problem-solving classes, worksheets, solutions, and recordings — organized session by session."
      items={items}
      loading={loading}
      loadFailed={failed}
      variant="recitation"
      unit="Class"
      pluralUnit="Classes"
      emptyMessage={
        loading
          ? "Loading recitation classes..."
          : failed
            ? "Recitation classes could not be loaded. Please refresh the page to try again."
            : "No recitation classes have been published yet."
      }
    />
  );
}

export default RecitationClasses;
