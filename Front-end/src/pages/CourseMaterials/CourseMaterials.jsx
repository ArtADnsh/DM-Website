import { getMaterialCategory, normalizeMaterial } from "../../utils/materials";
import { materialTabs } from "../../data/materialTabs";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";
import { useMemo, useRef, useState } from "react";

import FileCard from "../../components/FileCard/FileCard";
import CountBadge from "../../components/CountBadge/CountBadge";
import { useApiData } from "../../hooks/useApiData";
import { getNextTabIndex } from "../../utils/tabs";
import { getScrollBehavior } from "../../utils/motion";
import { fetchCourseFiles } from "../../api";
import styles from "./CourseMaterials.module.css";

function CourseMaterials() {
  const [activeTab, setActiveTab] = useState("lecture-notes");

  const { data, loading, failed: loadFailed } = useApiData(fetchCourseFiles);
  const materials = data ?? [];

  const tabsRef = useRef(null);

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

  const totalCountLabel = normalizedMaterials.length === 1 ? "File" : "Files";
  const countsReady = !loading && !loadFailed;

  const tabCountsKey = materialTabs
    .map((tab) => groupedMaterials[tab.id]?.length ?? 0)
    .join("-");

  const activeItems = groupedMaterials[activeTab] ?? [];

  const activeTabConfig = materialTabs.find((tab) => tab.id === activeTab);

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
      behavior: getScrollBehavior(),
    });
  };

  const handleTabKeyDown = (event, index) => {
    const nextIndex = getNextTabIndex(event.key, index, materialTabs.length);
    if (nextIndex === null) return;
    event.preventDefault();
    const tab = tabsRef.current?.querySelectorAll('[role="tab"]')[nextIndex];
    tab?.focus();
    tab?.click();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headingCopy}>

          <h1 className={styles.title}>Course Materials</h1>

          <p className={styles.subtitle}>
            Lecture notes, assignments, quizzes, and sample exams
          </p>
        </div>

        <CountBadge
          busy={loading}
          valueHidden
          value={countsReady ? normalizedMaterials.length : "—"}
          label={totalCountLabel}
          ariaLabel={
            loading
              ? "Loading course materials count"
              : loadFailed
                ? "Course materials count unavailable"
                : `${normalizedMaterials.length} ${totalCountLabel.toLowerCase()} total`
          }
        />
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
            {materialTabs.map((tab, index) => {
              const isActive = tab.id === activeTab;

              const count = groupedMaterials[tab.id]?.length ?? 0;

              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`materials-tab-${tab.id}`}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  aria-selected={isActive}
                  aria-controls="course-materials-panel"
                  className={`${styles.tab} ${
                    isActive ? styles.activeTab : ""
                  }`}
                  onClick={(event) => handleTabClick(event, tab.id)}
                >
                  <span className={styles.tabLabel}>{tab.label}</span>

                  <span className={styles.tabShortLabel}>{tab.shortLabel}</span>

                  <span className={styles.tabCount} aria-busy={loading}>
                    {countsReady ? count : "—"}
                  </span>
                </button>
              );
            })}
          </div>

          <ScrollIndicator
            scrollRef={tabsRef}
            contentKey={tabCountsKey}
            trackClassName={styles.tabScrollTrack}
            thumbClassName={styles.tabScrollThumb}
          />
        </div>

        <div
          id="course-materials-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`materials-tab-${activeTab}`}
          aria-busy={loading}
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
            <div className={styles.empty} role="status">
              {loading
                ? "Loading course materials…"
                : loadFailed
                  ? "Course materials could not be loaded. Please refresh the page to try again."
                  : activeTabConfig?.emptyMessage}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseMaterials;
