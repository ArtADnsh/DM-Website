import { useEffect } from "react";
import { useLocation } from "./hooks/useLocation";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import TAs from "./pages/TAs/TAs";
import CourseMaterials from "./pages/CourseMaterials/CourseMaterials";
import RecitationClasses from "./pages/RecitationClasses/RecitationClasses";
import RecitationClass from "./pages/RecitationClass/RecitationClass";
import Mentor from "./pages/Mentor/Mentor";
import Project from "./pages/Project/Project";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

function App() {
  const { pathname } = useLocation();

  const recitationMatch = pathname.match(/^\/recitations\/(\d+)$/);
  let page;
  let pageTitle = "Home";

  if (pathname === "/tas") {
    pageTitle = "Teaching Team";
    page = <TAs />;
  } else if (recitationMatch) {
    // The detail page sets its title from the fetched session data.
    pageTitle = null;
    page = <RecitationClass key={recitationMatch[1]} id={recitationMatch[1]} />;
  } else if (
    pathname === "/recitations" ||
    pathname === "/videos" ||
    pathname === "/tutorials"
  ) {
    pageTitle = "Recitation Classes";
    page = <RecitationClasses />;
  } else if (pathname === "/project") {
    pageTitle = "Project";
    page = <Project />;
  } else if (pathname === "/materials") {
    pageTitle = "Course Materials";
    page = <CourseMaterials />;
  } else if (pathname === "/contact") {
    pageTitle = "Contact Us";
    page = <Contact />;
  } else if (pathname === "/mentor" || pathname === "/mentors") {
    pageTitle = "Mentor Assignments";
    page = <Mentor />;
  } else if (pathname === "/") {
    page = <Home />;
  } else {
    pageTitle = "Page Not Found";
    page = <NotFound />;
  }

  useEffect(() => {
    if (pageTitle !== null) {
      document.title = `${pageTitle} | Discrete Mathematics · IUST`;
    }
  }, [pageTitle]);

  return (
    <div className="app">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default App;
