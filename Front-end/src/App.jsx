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

import "./App.css";

function App() {
  const { pathname } = useLocation();

  const recitationMatch = pathname.match(/^\/recitations\/(\d+)$/);
  let page;

  if (pathname === "/tas") {
    page = <TAs />;
  } else if (recitationMatch) {
    page = <RecitationClass key={recitationMatch[1]} id={recitationMatch[1]} />;
  } else if (
    pathname === "/recitations" ||
    pathname === "/videos" ||
    pathname === "/tutorials"
  ) {
    page = <RecitationClasses />;
  } else if (pathname === "/project") {
    page = <Project />;
  } else if (pathname === "/materials") {
    page = <CourseMaterials />;
  } else if (pathname === "/contact") {
    page = <Contact />;
  } else if (pathname === "/mentor" || pathname === "/mentors") {
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
