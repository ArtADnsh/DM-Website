import { ROUTES } from './routes';

const link = (route, label, options = {}) => ({
  href: route.path,
  label,
  route,
  ...options,
});

export const navigationLinks = [
  link(ROUTES.home, 'Home'),
  link(ROUTES.materials, 'Course Materials'),
  link(ROUTES.project, 'Project'),
  // `nested`: detail pages (/recitations/3) keep this link highlighted.
  link(ROUTES.recitations, 'Recitation Classes', { nested: true }),
  link(ROUTES.team, 'Teaching Team'),
  link(ROUTES.mentors, 'Mentors'),
  link(ROUTES.contact, 'Contact Us'),
];

export function isNavLinkActive(navLink, pathname) {
  return (
    navLink.route.matches.includes(pathname) ||
    (Boolean(navLink.nested) && pathname.startsWith(`${navLink.route.path}/`))
  );
}

/** Shorter list with its own wording, used in the footer. */
export const footerLinks = [
  link(ROUTES.home, 'Home Page'),
  link(ROUTES.materials, 'Course Materials'),
  link(ROUTES.recitations, 'Tutorial Recordings'),
  link(ROUTES.team, 'Meet the Teaching Team'),
  link(ROUTES.contact, 'Contact Us'),
];
