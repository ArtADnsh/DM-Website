import { useLayoutEffect, useState } from "react";

/** Measure an overflowing horizontal list and clean up all observers/listeners. */
export function useScrollIndicator(
  ref,
  contentKey,
  activeKey,
  mediaQuery = "(max-width: 640px)",
) {
  const [scroller, setScroller] = useState({
    visible: false,
    width: 100,
    left: 0,
  });
  useLayoutEffect(() => {
    const tabs = ref.current;

    if (!tabs) {
      return undefined;
    }

    const mobileMedia = window.matchMedia(mediaQuery);

    let animationFrame;

    const measure = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const isMobile = mobileMedia.matches;

        const scrollWidth = tabs.scrollWidth;
        const clientWidth = tabs.clientWidth;
        const scrollLeft = tabs.scrollLeft;

        const hasOverflow = scrollWidth > clientWidth + 1;

        if (!isMobile || !hasOverflow) {
          setScroller((previous) => {
            if (!previous.visible) {
              return previous;
            }

            return {
              visible: false,
              width: 100,
              left: 0,
            };
          });

          return;
        }

        const visibleRatio = clientWidth / scrollWidth;

        const thumbWidth = Math.max(15, Math.min(100, visibleRatio * 100));

        const maxScroll = scrollWidth - clientWidth;

        const progress =
          maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 0;

        const maxThumbLeft = 100 - thumbWidth;

        const thumbLeft = progress * maxThumbLeft;

        setScroller((previous) => {
          const widthChanged = Math.abs(previous.width - thumbWidth) > 0.1;

          const leftChanged = Math.abs(previous.left - thumbLeft) > 0.1;

          if (previous.visible && !widthChanged && !leftChanged) {
            return previous;
          }

          return {
            visible: true,
            width: thumbWidth,
            left: thumbLeft,
          };
        });
      });
    };

    measure();

    tabs.addEventListener("scroll", measure, {
      passive: true,
    });

    window.addEventListener("resize", measure);

    if (mobileMedia.addEventListener) {
      mobileMedia.addEventListener("change", measure);
    } else {
      mobileMedia.addListener(measure);
    }

    let resizeObserver;

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(measure);

      resizeObserver.observe(tabs);

      Array.from(tabs.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrame);

      tabs.removeEventListener("scroll", measure);

      window.removeEventListener("resize", measure);

      if (mobileMedia.removeEventListener) {
        mobileMedia.removeEventListener("change", measure);
      } else {
        mobileMedia.removeListener(measure);
      }

      resizeObserver?.disconnect();
    };
  }, [ref, contentKey, activeKey, mediaQuery]);

  return scroller;
}
