/** Initials of the first and last name; academic titles (Dr./Prof.) are ignored. */
export function getInitials(name = "") {
  return name
    .replace(/^(dr|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** "@name" -> "name" */
export function getTelegramHandle(telegram) {
  return telegram?.trim().replace(/^@/, "") ?? "";
}

/** Handles starting with "replace_me_" mark contacts that are not filled in yet. */
export function isPlaceholderTelegram(telegram) {
  return getTelegramHandle(telegram).startsWith("replace_me_");
}

/** Public t.me link, or null when there is no usable handle. */
export function getTelegramUrl(telegram) {
  const handle = getTelegramHandle(telegram);
  return handle && !isPlaceholderTelegram(telegram)
    ? `https://t.me/${handle}`
    : null;
}
