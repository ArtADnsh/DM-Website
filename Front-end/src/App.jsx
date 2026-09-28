import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import TAs from './pages/TAs/TAs';
import CourseMaterials from './pages/CourseMaterials/CourseMaterials';
import Tutorials from './pages/Tutorials/Tutorials';

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

  // Scroll to the hash target (once the page has rendered) or to the top.
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  let page;

  if (pathname === '/tas') {
    page = <TAs />;
  } else if (pathname === '/tutorials') {
    page = <Tutorials />;
  } else if (pathname === '/materials') {
    page = <CourseMaterials />;
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
