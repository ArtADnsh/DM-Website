import { FolderIcon, VideoIcon, TelegramIcon } from "../../components/icons";
import { useState } from "react";

import FileCard from "../../components/FileCard/FileCard";
import CountBadge from "../../components/CountBadge/CountBadge";
import { fetchRecitations } from "../../api";
import { useApiData } from "../../hooks/useApiData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { findTeamMemberByName } from "../../data/teamMembers";
import { ROUTES } from "../../data/routes";
import { getTelegramUrl } from "../../utils/people";
import { getNextTabIndex } from "../../utils/tabs";
import styles from "./RecitationClass.module.css";

const TABS = [
  {
    id: "files",
    label: "Class Files",
    emptyMessage: "No class files have been published yet.",
  },
  {
    id: "videos",
    label: "Class Videos",
    emptyMessage: "No class recordings have been published yet.",
  },
];

function BackLink({ children }) {
  return (
    <a className={styles.backLink} href={ROUTES.recitations.path} data-internal-link>
      <span aria-hidden="true">←</span>
      {children}
    </a>
  );
}

function RecitationClass({ id }) {
  const [activeTab, setActiveTab] = useState("files");

  const { data, loading, failed: loadFailed } = useApiData(fetchRecitations, {
    deps: [id],
  });
  const recitation = Array.isArray(data)
    ? (data.find((item) => String(item.id) === String(id)) ??
      data.find((item) => String(item.number) === String(id)) ??
      null)
    : null;

  useDocumentTitle(
    loading
      ? `Recitation Class ${id}`
      : loadFailed
        ? "Unable to Load Recitation Class"
        : recitation
          ? `Recitation Class ${recitation.number || id}: ${recitation.title || "Session"}`
          : "Class Not Found",
  );

  const handleTabKeyDown = (event, index) => {
    const nextIndex = getNextTabIndex(event.key, index, TABS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    const tabs = event.currentTarget.closest('[role="tablist"]');
    tabs?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <BackLink>Recitation Classes</BackLink>
        <div className={styles.notFound} role="status" aria-busy="true">
          <span>Loading session...</span>
          <p>Fetching recitation details from backend...</p>
        </div>
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className={styles.page}>
        <BackLink>Recitation Classes</BackLink>
        <div className={styles.notFound} role="alert">
          <span>Unable to load class</span>
          <h1>Recitation details could not be loaded.</h1>
          <p>Please refresh the page to try again.</p>
        </div>
      </div>
    );
  }

  if (!recitation) {
    return (
      <div className={styles.page}>
        <BackLink>Recitation Classes</BackLink>
        <div className={styles.notFound}>
          <span>Class not found</span>
          <h1>This recitation class does not exist.</h1>
          <p>
            Return to the recitation list and choose one of the available
            sessions.
          </p>
        </div>
      </div>
    );
  }

  const files = recitation.files || [];
  const videos = recitation.videos || [];
  const activeConfig = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];
  const activeItems = activeTab === "files" ? files : videos;
  const totalResources = files.length + videos.length;

  const telegramUrl = getTelegramUrl(
    findTeamMemberByName(recitation.instructor)?.telegram,
  );

  return (
    <div className={styles.page}>
      <BackLink>All recitation classes</BackLink>

      <header className={styles.header}>
        <div className={styles.headingCopy}>
          <div className={styles.kickerRow}>
            <p className={styles.eyebrow}>
              Recitation Class {recitation.number}
            </p>
            <span className={styles.date}>
              {recitation.date || recitation.date_time}
            </span>
          </div>

          <h1 className={styles.title}>{recitation.title}</h1>
          <p className={styles.subtitle}>{recitation.description}</p>

          <div className={styles.instructorContainer}>
            <p className={styles.instructor}>
              Instructor <strong>{recitation.instructor}</strong>
            </p>
            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.telegramLink}
                title={`Ask ${recitation.instructor} a question on Telegram`}
              >
                <TelegramIcon aria-hidden="true" />
                <span>Ask on Telegram</span>
              </a>
            )}
          </div>
        </div>

        <CountBadge
          value={totalResources}
          label={totalResources === 1 ? "Resource" : "Resources"}
          ariaLabel={`${totalResources} resources total`}
        />
      </header>

      <section
        className={styles.browser}
        aria-label={`Resources for recitation class ${recitation.number}`}
      >
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Recitation resource type"
        >
          {TABS.map((tab, index) => {
            const isActive = tab.id === activeTab;
            const count = (tab.id === "files" ? files : videos).length;

            return (
              <button
                key={tab.id}
                type="button"
                id={`recitation-tab-${tab.id}`}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                aria-selected={isActive}
                aria-controls="recitation-resources-panel"
                className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.id === "files" ? (
                  <FolderIcon />
                ) : (
                  <VideoIcon strokeWidth={1.7} />
                )}
                <span>{tab.label}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div
          id="recitation-resources-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`recitation-tab-${activeTab}`}
          className={styles.panel}
        >
          {activeItems.length > 0 ? (
            <section className={styles.list} aria-label={activeConfig.label}>
              {activeItems.map((item, index) => (
                <FileCard
                  key={item.id}
                  file={{
                    ...item,
                    number: String(index + 1).padStart(2, "0"),
                  }}
                  variant={activeTab === "files" ? "document" : "video"}
                />
              ))}
            </section>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                {activeTab === "files" ? (
                  <FolderIcon />
                ) : (
                  <VideoIcon strokeWidth={1.7} />
                )}
              </span>
              <strong>Nothing here yet</strong>
              <p>{activeConfig.emptyMessage}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RecitationClass;
