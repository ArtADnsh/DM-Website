import { FolderIcon, VideoIcon, TelegramIcon } from "../../components/icons";
import { useEffect, useState } from "react";

import FileCard from "../../components/FileCard/FileCard";
import { fetchRecitations } from "../../api";
import styles from "./RecitationClass.module.css";

const TABS = [
  {
    id: "files",
    label: "Class Files",
    singular: "file",
    plural: "files",
    emptyMessage: "No class files have been published yet.",
  },
  {
    id: "videos",
    label: "Class Videos",
    singular: "video",
    plural: "videos",
    emptyMessage: "No class recordings have been published yet.",
  },
];

function RecitationClass({ id }) {
  const [recitation, setRecitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("files");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setLoading(true);
    setRecitation(null);
    setActiveTab("files");
    async function loadData() {
      try {
        const data = await fetchRecitations({ signal: controller.signal });
        if (isMounted && Array.isArray(data)) {
          const found = data.find(
            (item) =>
              String(item.id) === String(id) ||
              String(item.number) === String(id),
          );
          if (found) {
            setRecitation(found);
          }
        }
      } catch (err) {
        console.error("Failed to load recitation detail:", err);
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
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <a className={styles.backLink} href="/recitations" data-internal-link>
          <span aria-hidden="true">←</span>
          Recitation Classes
        </a>
        <div className={styles.notFound}>
          <span>Loading session...</span>
          <p>Fetching recitation details from backend...</p>
        </div>
      </div>
    );
  }

  if (!recitation) {
    return (
      <div className={styles.page}>
        <a className={styles.backLink} href="/recitations" data-internal-link>
          <span aria-hidden="true">←</span>
          Recitation Classes
        </a>
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
  const activeUnit =
    activeItems.length === 1 ? activeConfig.singular : activeConfig.plural;

  const telegramHandle =
    recitation.instructor_telegram || recitation.instructorTelegram;
  const telegramUrl = telegramHandle
    ? telegramHandle.startsWith("http")
      ? telegramHandle
      : `https://t.me/${telegramHandle.replace("@", "")}`
    : null;
  const telegramLabel = telegramHandle
    ? telegramHandle.startsWith("@")
      ? telegramHandle
      : `@${telegramHandle.split("/").pop()}`
    : "";

  return (
    <div className={styles.page}>
      <a className={styles.backLink} href="/recitations" data-internal-link>
        <span aria-hidden="true">←</span>
        All recitation classes
      </a>

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
                className={styles.telegramButton}
                title={`Ask ${recitation.instructor} a question on Telegram`}
              >
                <TelegramIcon />
                <span>Ask TA on Telegram</span>
              </a>
            )}
          </div>
        </div>

        <div
          className={styles.totalCount}
          aria-label={`${totalResources} resources total`}
        >
          <strong>{totalResources}</strong>
          <span>{totalResources === 1 ? "resource" : "resources"}</span>
        </div>
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
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = (tab.id === "files" ? files : videos).length;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
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

        <div className={styles.resultBar}>
          <div>
            <strong>{activeConfig.label}</strong>
            <span>
              {activeItems.length} {activeUnit}
            </span>
          </div>
          <span className={styles.resultHint}>
            {activeTab === "files"
              ? "Slides, worksheets & solutions"
              : "Session recordings"}
          </span>
        </div>

        <div
          id="recitation-resources-panel"
          role="tabpanel"
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
