import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import TAs from './pages/TAs/TAs';

import './App.css';

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };

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
      setPathname(normalizePath(url.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.addEventListener('click', handleInternalNavigation);
    return () => document.removeEventListener('click', handleInternalNavigation);
  }, []);

  const page = pathname === '/tas' ? <TAs /> : <Home />;

  return (
    <div className="app">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default App;
