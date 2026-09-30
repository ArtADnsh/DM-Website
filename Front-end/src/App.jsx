import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import TAs from './pages/TAs/TAs';
import CourseMaterials from './pages/CourseMaterials/CourseMaterials';
import RecitationClasses from './pages/RecitationClasses/RecitationClasses';
import RecitationClass from './pages/RecitationClass/RecitationClass';
import Mentor from './pages/Mentor/Mentor';
import Project from './pages/Project/Project';

import './App.css';

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function getLocation() {
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
}

function App() {
  const [location, setLocation] = useState(getLocation);
  const { pathname, hash } = location;

  useEffect(() => {
    const handlePopState = () => setLocation(getLocation());

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      const link = event.target.closest('a[data-internal-link]');

      if (!link || event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(link.href, window.location.origin);

      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.hash}`);
      setLocation(getLocation());
    };

    document.addEventListener('click', handleInternalNavigation);
    return () => document.removeEventListener('click', handleInternalNavigation);
  }, []);

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  const recitationMatch = pathname.match(/^\/recitations\/(\d+)$/);
  let page;

  if (pathname === '/tas') {
    page = <TAs />;
  } else if (recitationMatch) {
    page = <RecitationClass id={recitationMatch[1]} />;
  } else if (
    pathname === '/recitations' ||
    pathname === '/videos' ||
    pathname === '/tutorials'
  ) {
    page = <RecitationClasses />;
  } else if (pathname === '/project') {
    page = <Project />;
  } else if (pathname === '/materials') {
    page = <CourseMaterials />;
  } else if (pathname === '/mentor' || pathname === '/mentors') {
    page = <Mentor />;
  } else {
    page = <Home />;
  }

  return (
    <div className="app">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default App;
