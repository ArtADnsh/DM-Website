import { useLocation } from "./hooks/useLocation";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { ROUTES, RECITATION_DETAIL_PATTERN } from "./data/routes";

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

const PAGES = [
  { route: ROUTES.home, title: "Home", Page: Home },
  { route: ROUTES.team, title: "Teaching Team", Page: TAs },
  { route: ROUTES.recitations, title: "Recitation Classes", Page: RecitationClasses },
  { route: ROUTES.project, title: "Project", Page: Project },
  { route: ROUTES.materials, title: "Course Materials", Page: CourseMaterials },
  { route: ROUTES.contact, title: "Contact Us", Page: Contact },
  { route: ROUTES.mentors, title: "Mentor Assignments", Page: Mentor },
];

function resolvePage(pathname) {
  const recitationMatch = pathname.match(RECITATION_DETAIL_PATTERN);

  if (recitationMatch) {
    // The detail page sets its own title from the fetched session data.
    const id = recitationMatch[1];
    return { title: null, page: <RecitationClass key={id} id={id} /> };
  }

  const match = PAGES.find(({ route }) => route.matches.includes(pathname));

  if (match) {
    const { Page, title } = match;
    return { title, page: <Page /> };
  }

  return { title: "Page Not Found", page: <NotFound /> };
}

function App() {
  const { pathname } = useLocation();
  const { title, page } = resolvePage(pathname);

  useDocumentTitle(title);

  return (
    <div className="app">
      <Header pathname={pathname} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default App;
