/**
 * Keyboard navigation for a tablist (arrow keys, Home, End).
 * Returns the index of the tab to move to, or null if the key is not handled.
 */
export function getNextTabIndex(key, currentIndex, count) {
  switch (key) {
    case "ArrowRight":
      return (currentIndex + 1) % count;
    case "ArrowLeft":
      return (currentIndex - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
