import { useEffect, useMemo, useState } from 'react';



import FileCard from '../../components/FileCard/FileCard';
import { courseMaterials as fallbackMaterials } from '../../data/courseMaterials';
import { fetchCourseFiles } from '../../api';
import styles from './CourseMaterials.module.css';


const MATERIAL_TABS = [
  {
    id: 'lecture-notes',
    label: 'Lecture Notes',
    shortLabel: 'Notes',
    emptyMessage: 'No lecture notes have been published yet.',
  },
  {
    id: 'assignments',
    label: 'Assignments',
    shortLabel: 'Assignments',
    emptyMessage: 'No assignments have been published yet.',
  },
  {
    id: 'quizzes',
    label: 'Quizzes',
    shortLabel: 'Quizzes',
    emptyMessage: 'No quizzes have been published yet.',
  },
  {
    id: 'sample-exams',
    label: 'Sample Exams',
    shortLabel: 'Exams',
    emptyMessage: 'No sample exams have been published yet.',
  },
];

function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ');
}

function getMaterialCategory(material) {
  const cat = material.category ? String(material.category).toLowerCase() : '';

  if (cat === 'assignment' || cat === 'assignments' || cat === 'homework') return 'assignments';
  if (cat === 'quiz' || cat === 'quizzes') return 'quizzes';
  if (cat === 'sample_exam' || cat === 'sample-exams' || cat === 'exam' || cat === 'exams') return 'sample-exams';
  if (cat === 'lecture_note' || cat === 'lecture-notes' || cat === 'note' || cat === 'notes') return 'lecture-notes';

  const searchableText = [
    material.category_display,
    material.categoryDisplay,
    material.title,
    material.description,
  ]
    .map(normalizeText)
    .filter(Boolean)
    .join(' ');

  if (/\b(exam|sample exam|past paper)s?\b/.test(searchableText)) return 'sample-exams';
  if (/\bquiz(zes)?\b/.test(searchableText)) return 'quizzes';
  if (/\b(assignment|homework|problem set|exercise|worksheet)s?\b/.test(searchableText)) return 'assignments';
  return 'lecture-notes';
}


function normalizeMaterial(material, index) {
  return {
    ...material,
    id: material.id ?? `${getMaterialCategory(material)}-${index}`,
    number: material.number ?? String(index + 1).padStart(2, '0'),
    url: material.url ?? material.file_url ?? material.file ?? '#',
    type: material.type ?? material.file_type ?? 'PDF',
    size: material.size ?? material.file_size ?? '',
  };
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        className={styles.folderBack}
        d="M3.5 8.75A3.25 3.25 0 0 1 6.75 5.5h6.1c.85 0 1.67.34 2.27.94l1.88 1.88h8.25a3.25 3.25 0 0 1 3.25 3.25v1.18h-25Z"
      />
      <path
        className={styles.folderFront}
        d="M3.5 12.25h25v10.5A3.75 3.75 0 0 1 24.75 26.5H7.25a3.75 3.75 0 0 1-3.75-3.75Z"
      />
      <path className={styles.folderLine} d="M7.25 16.25h17.5" />
    </svg>
  );
}

function CourseMaterials() {
  const [materials, setMaterials] = useState(fallbackMaterials);
  const [activeTab, setActiveTab] = useState('lecture-notes');
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

  const normalizedMaterials = useMemo(
    () => materials.map(normalizeMaterial),
    [materials],
  );

  const groupedMaterials = useMemo(() => {
    const groups = {
      'lecture-notes': [],
      assignments: [],
      quizzes: [],
      'sample-exams': [],
    };

    normalizedMaterials.forEach((material) => {
      const catKey = getMaterialCategory(material);
      if (groups[catKey]) {
        groups[catKey].push(material);
      } else {
        groups['lecture-notes'].push(material);
      }
    });

    return groups;
  }, [normalizedMaterials]);

  const activeItems = groupedMaterials[activeTab] ?? [];
  const activeTabConfig = MATERIAL_TABS.find((tab) => tab.id === activeTab);
  const activeCountLabel = activeItems.length === 1 ? 'file' : 'files';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}>Discrete Mathematics</p>
          <h1 className={styles.title}>Course Materials</h1>
          <p className={styles.subtitle}>
            Lecture notes, assignments, quizzes, and sample exams — directly from the backend API.
          </p>
        </div>

        <div className={styles.totalCount} aria-label={`${normalizedMaterials.length} files total`}>
          <strong>{normalizedMaterials.length}</strong>
          <span>files</span>
        </div>
      </header>

      <section className={styles.browser} aria-label="Course material categories">
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Filter course materials"
        >
          {MATERIAL_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = (groupedMaterials[tab.id] || []).length;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="course-materials-panel"
                className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabShortLabel}>{tab.shortLabel}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.resultBar}>

          <div className={styles.resultTitle}>

            <span className={styles.folderIcon}><FolderIcon /></span>
            <div>
              <strong>{activeTabConfig?.label}</strong>
              <span>{activeItems.length} {activeCountLabel}</span>
            </div>
          </div>

        </div>

        <div
          id="course-materials-panel"
          role="tabpanel"
          className={styles.panel}
        >
          {activeItems.length > 0 ? (
            <section className={styles.list} aria-label={activeTabConfig?.label}>
              {activeItems.map((item, index) => (
                <FileCard
                  key={item.id}
                  file={{
                    ...item,
                    number: String(index + 1).padStart(2, '0'),
                  }}
                  variant="document"
                />
              ))}
            </section>
          ) : (
            <div className={styles.empty}>
              {loading ? 'Loading course materials from backend...' : activeTabConfig?.emptyMessage}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseMaterials;
