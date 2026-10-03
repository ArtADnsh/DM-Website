import { FolderIcon, VideoIcon, TelegramIcon } from "../../components/icons";
import { useEffect, useState } from "react";

import FileCard from "../../components/FileCard/FileCard";
import { fetchRecitations } from "../../api";
import { teamMembers } from "../../data/teamMembers";
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

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = TABS.length - 1;
    else return;

    event.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    const tabs = event.currentTarget.closest('[role="tablist"]');
    tabs?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

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

  const normalizeName = (name) =>
    String(name ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  const instructor = teamMembers.find(
    (member) => normalizeName(member.name) === normalizeName(recitation.instructor),
  );
  const telegramHandle = instructor?.telegram?.trim().replace(/^@/, "");
  const telegramUrl =
    telegramHandle && !telegramHandle.startsWith("replace_me_")
      ? `https://t.me/${telegramHandle}`
      : null;

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
                className={styles.telegramLink}
                title={`Ask ${recitation.instructor} a question on Telegram`}
              >
                <TelegramIcon aria-hidden="true" />
                <span>Ask on Telegram</span>
              </a>
            )}
          </div>
        </div>

        <div
          className={styles.totalCount}
          aria-label={`${totalResources} resources total`}
        >
          <strong>{totalResources}</strong>
          <span>{totalResources === 1 ? "Resource" : "Resources"}</span>
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
