import { MaterialsFolderIcon } from "../../components/icons";
import { getMaterialCategory, normalizeMaterial } from "../../utils/materials";
import { materialTabs } from "../../data/materialTabs";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import { useEffect, useMemo, useRef, useState } from "react";

import FileCard from "../../components/FileCard/FileCard";
import { fetchCourseFiles } from "../../api";
import styles from "./CourseMaterials.module.css";

function CourseMaterials() {
  const [materials, setMaterials] = useState([]);

  const [activeTab, setActiveTab] = useState("lecture-notes");

  const [loading, setLoading] = useState(true);

  const tabsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadData() {
      try {
        const data = await fetchCourseFiles(null, { signal: controller.signal });

        if (isMounted && Array.isArray(data)) {
          setMaterials(data);
        }
      } catch (error) {
        console.error("Failed to fetch course materials:", error);
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

  const normalizedMaterials = useMemo(
    () => materials.map(normalizeMaterial),
    [materials],
  );

  const groupedMaterials = useMemo(() => {
    const groups = {
      "lecture-notes": [],
      assignments: [],
      quizzes: [],
      "sample-exams": [],
    };

    normalizedMaterials.forEach((material) => {
      const category = getMaterialCategory(material);

      if (groups[category]) {
        groups[category].push(material);
      } else {
        groups["lecture-notes"].push(material);
      }
    });

    return groups;
  }, [normalizedMaterials]);

  const tabCountsKey = materialTabs
    .map((tab) => groupedMaterials[tab.id]?.length ?? 0)
    .join("-");

  const tabScroller = useScrollIndicator(tabsRef, tabCountsKey, activeTab);

  const activeItems = groupedMaterials[activeTab] ?? [];

  const activeTabConfig = materialTabs.find((tab) => tab.id === activeTab);

  const activeCountLabel = activeItems.length === 1 ? "file" : "files";

  const handleTabClick = (event, tabId) => {
    setActiveTab(tabId);

    const tabs = tabsRef.current;
    const tab = event.currentTarget;

    if (!tabs || !tab) {
      return;
    }

    const targetLeft =
      tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2;

    tabs.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}>Discrete Mathematics</p>

          <h1 className={styles.title}>Course Materials</h1>

          <p className={styles.subtitle}>
            Lecture notes, assignments, quizzes, and sample exams
          </p>
        </div>

        <div
          className={styles.totalCount}
          aria-label={`${normalizedMaterials.length} files total`}
        >
          <strong>{normalizedMaterials.length}</strong>

          <span>files</span>
        </div>
      </header>

      <section
        className={styles.browser}
        aria-label="Course material categories"
      >
        <div className={styles.tabsWrapper}>
          <div
            ref={tabsRef}
            className={styles.tabs}
            role="tablist"
            aria-label="Filter course materials"
          >
            {materialTabs.map((tab) => {
              const isActive = tab.id === activeTab;

              const count = groupedMaterials[tab.id]?.length ?? 0;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="course-materials-panel"
                  className={`${styles.tab} ${
                    isActive ? styles.activeTab : ""
                  }`}
                  onClick={(event) => handleTabClick(event, tab.id)}
                >
                  <span className={styles.tabLabel}>{tab.label}</span>

                  <span className={styles.tabShortLabel}>{tab.shortLabel}</span>

                  <span className={styles.tabCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {tabScroller.visible && (
            <div className={styles.tabScrollTrack} aria-hidden="true">
              <div
                className={styles.tabScrollThumb}
                style={{
                  width: `${tabScroller.width}%`,
                  left: `${tabScroller.left}%`,
                }}
              />
            </div>
          )}
        </div>

        <div className={styles.resultBar}>
          <div className={styles.resultTitle}>
            <span className={styles.folderIcon}>
              <MaterialsFolderIcon
                backClassName={styles.folderBack}
                frontClassName={styles.folderFront}
                lineClassName={styles.folderLine}
              />
            </span>

            <div>
              <strong>{activeTabConfig?.label}</strong>

              <span>
                {activeItems.length} {activeCountLabel}
              </span>
            </div>
          </div>
        </div>

        <div
          id="course-materials-panel"
          role="tabpanel"
          className={styles.panel}
        >
          {activeItems.length > 0 ? (
            <section
              className={styles.list}
              aria-label={activeTabConfig?.label}
            >
              {activeItems.map((item, index) => (
                <FileCard
                  key={item.id}
                  file={{
                    ...item,
                    number: String(index + 1).padStart(2, "0"),
                  }}
                  variant="document"
                />
              ))}
            </section>
          ) : (
            <div className={styles.empty}>
              {loading
                ? "Loading course materials from backend..."
                : activeTabConfig?.emptyMessage}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseMaterials;
