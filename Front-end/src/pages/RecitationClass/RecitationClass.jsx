import { useEffect, useState } from 'react';

import FileCard from '../../components/FileCard/FileCard';
import { getRecitationClass } from '../../data/recitationClasses';
import { fetchRecitations } from '../../api';
import styles from './RecitationClass.module.css';

const TABS = [
  {
    id: 'files',
    label: 'Class Files',
    singular: 'file',
    plural: 'files',
    emptyMessage: 'No class files have been published yet.',
  },
  {
    id: 'videos',
    label: 'Class Videos',
    singular: 'video',
    plural: 'videos',
    emptyMessage: 'No class recordings have been published yet.',
  },
];

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 6.5h6l2 2h9v9A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M3.5 9h17" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
      <path d="m9.7 13.9 4.2-3.8" />
    </svg>
  );
}

function RecitationClass({ id }) {
  const [recitation, setRecitation] = useState(() => getRecitationClass(id));
  const [activeTab, setActiveTab] = useState('files');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchRecitations();
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const found = data.find((item) => String(item.id) === String(id) || String(item.number) === String(id));
        if (found) {
          setRecitation(found);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

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
          <p>Return to the recitation list and choose one of the available sessions.</p>
        </div>
      </div>
    );
  }

  const files = recitation.files || [];
  const videos = recitation.videos || [];
  const activeConfig = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];
  const activeItems = activeTab === 'files' ? files : videos;
  const totalResources = files.length + videos.length;
  const activeUnit = activeItems.length === 1 ? activeConfig.singular : activeConfig.plural;

  const telegramHandle = recitation.instructor_telegram || recitation.instructorTelegram;
  const telegramUrl = telegramHandle
    ? telegramHandle.startsWith('http')
      ? telegramHandle
      : `https://t.me/${telegramHandle.replace('@', '')}`
    : null;
  const telegramLabel = telegramHandle
    ? telegramHandle.startsWith('@')
      ? telegramHandle
      : `@${telegramHandle.split('/').pop()}`
    : '';

  return (
    <div className={styles.page}>
      <a className={styles.backLink} href="/recitations" data-internal-link>
        <span aria-hidden="true">←</span>
        All recitation classes
      </a>

      <header className={styles.header}>
        <div className={styles.headingCopy}>
          <div className={styles.kickerRow}>
            <p className={styles.eyebrow}>Recitation Class {recitation.number}</p>
            <span className={styles.date}>{recitation.date || recitation.date_time}</span>
          </div>

          <h1 className={styles.title}>{recitation.title}</h1>
          <p className={styles.subtitle}>{recitation.description}</p>
          
          <div className={styles.instructorContainer}>
            <p className={styles.instructor}>Instructor <strong>{recitation.instructor}</strong></p>
            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.telegramButton}
                title={`Ask ${recitation.instructor} a question on Telegram`}
              >
                <TelegramIcon />
                <span>Ask TA on Telegram ({telegramLabel})</span>
              </a>
            )}
          </div>
        </div>

        <div className={styles.totalCount} aria-label={`${totalResources} resources total`}>
          <strong>{totalResources}</strong>
          <span>{totalResources === 1 ? 'resource' : 'resources'}</span>
        </div>
      </header>

      <section className={styles.browser} aria-label={`Resources for recitation class ${recitation.number}`}>
        <div className={styles.tabs} role="tablist" aria-label="Recitation resource type">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = (tab.id === 'files' ? files : videos).length;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="recitation-resources-panel"
                className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.id === 'files' ? <FolderIcon /> : <VideoIcon />}
                <span>{tab.label}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.resultBar}>
          <div>
            <strong>{activeConfig.label}</strong>
            <span>{activeItems.length} {activeUnit}</span>
          </div>
          <span className={styles.resultHint}>
            {activeTab === 'files' ? 'Slides, worksheets & solutions' : 'Session recordings'}
          </span>
        </div>

        <div id="recitation-resources-panel" role="tabpanel" className={styles.panel}>
          {activeItems.length > 0 ? (
            <section className={styles.list} aria-label={activeConfig.label}>
              {activeItems.map((item, index) => (
                <FileCard
                  key={item.id}
                  file={{
                    ...item,
                    number: String(index + 1).padStart(2, '0'),
                  }}
                  variant={activeTab === 'files' ? 'document' : 'video'}
                />
              ))}
            </section>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                {activeTab === 'files' ? <FolderIcon /> : <VideoIcon />}
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
