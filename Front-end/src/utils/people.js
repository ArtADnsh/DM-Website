/** Initial letters of first/last name, with optional title removal for team cards. */
export function getInitials(name = "", { stripTitle = false } = {}) {
  const displayName = stripTitle ? name.replace(/^(dr|prof)\.?\s+/i, "") : name;
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
