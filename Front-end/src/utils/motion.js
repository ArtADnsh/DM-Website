/** "auto" for users who prefer reduced motion, otherwise "smooth". */
export function getScrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
