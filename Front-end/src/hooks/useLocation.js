import { useEffect, useState } from "react";

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function getLocation() {
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
}

export function useLocation() {
  const [location, setLocation] = useState(getLocation);

  useEffect(() => {
    const handlePopState = () => setLocation(getLocation());

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      const link =
        event.target instanceof Element
          ? event.target.closest("a[data-internal-link]")
          : null;

      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self") ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const url = new URL(link.href, window.location.origin);

      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();

      const destination = `${url.pathname}${url.search}${url.hash}`;
      const current =
        `${window.location.pathname}` +
        `${window.location.search}` +
        `${window.location.hash}`;

      if (destination !== current) {
        window.history.pushState({}, "", destination);
      }

      // A new object also triggers scrolling when the URL hasn't changed.
      setLocation(getLocation());
    };

    document.addEventListener("click", handleInternalNavigation);

    return () => {
      document.removeEventListener("click", handleInternalNavigation);
    };
  }, []);

  useEffect(() => {
    const { hash } = location;
    let targetId = hash.slice(1);

    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep malformed hashes literal.
    }

    const target = hash ? document.getElementById(targetId) : null;
    const behavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";

    if (target) {
      target.scrollIntoView({ behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [location]);

  return location;
}