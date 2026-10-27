import { useEffect } from "react";
import { formatPageTitle } from "../data/site";

/** Sets "<title> | Discrete Mathematics · IUST". A null title leaves it untouched. */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title !== null) {
      document.title = formatPageTitle(title);
    }
  }, [title]);
}
