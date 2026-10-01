export const navigationLinks = [
  { href: "/", label: "Home", isActive: (path) => path === "/" },
  {
    href: "/materials",
    label: "Course Materials",
    isActive: (path) => path === "/materials",
  },
  {
    href: "/project",
    label: "Project",
    isActive: (path) => path === "/project",
  },
  {
    href: "/recitations",
    label: "Recitation Classes",
    isActive: (path) =>
      path === "/recitations" ||
      path.startsWith("/recitations/") ||
      path === "/videos" ||
      path === "/tutorials",
  },
  { href: "/tas", label: "Teaching Team", isActive: (path) => path === "/tas" },
  {
    href: "/mentors",
    label: "Mentors",
    isActive: (path) => path === "/mentor" || path === "/mentors",
  },
  {
    href: "/contact",
    label: "Contact Us",
    isActive: (path) => path === "/contact",
  },
];
