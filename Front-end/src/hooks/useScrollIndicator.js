import { useEffect } from "react";

/** Cache geometry on resize; scroll frames only read scrollLeft and move the thumb. */
export function useScrollIndicator(
  scrollRef,
  trackRef,
  thumbRef,
  contentKey,
  mediaQuery = "(max-width: 640px)",
) {
  useEffect(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!scroller || !track || !thumb) return undefined;

    const media = window.matchMedia(mediaQuery);
    let frame = null;
    let needsMeasure = true;
    let maxScroll = 0;
    let maxTravel = 0;
    let lastOffset = null;

    const updatePosition = () => {
      if (track.hidden) return;

      const progress = Math.min(1, Math.max(0, scroller.scrollLeft / maxScroll));
      const offset = progress * maxTravel;

      if (offset !== lastOffset) {
        thumb.style.transform = `translateX(${offset}px)`;
        lastOffset = offset;
      }
    };

    const measure = () => {
      if (!media.matches) {
        track.hidden = true;
        return;
      }

      const scrollWidth = scroller.scrollWidth;
      const clientWidth = scroller.clientWidth;
      maxScroll = scrollWidth - clientWidth;

      if (maxScroll <= 1) {
        track.hidden = true;
        return;
      }

      // Reveal before measuring: a hidden track has no layout width.
      track.hidden = false;
      const trackWidth = track.clientWidth;
      const width = Math.min(
        trackWidth,
        Math.max(32, trackWidth * Math.max(0.15, clientWidth / scrollWidth)),
      );

      thumb.style.width = `${width}px`;
      maxTravel = trackWidth - width;
      lastOffset = null;
    };

    const flush = () => {
      frame = null;
      if (needsMeasure) {
        needsMeasure = false;
        measure();
      }
      updatePosition();
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(flush);
    };

    const scheduleMeasure = () => {
      needsMeasure = true;
      schedule();
    };

    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    if (media.addEventListener) {
      media.addEventListener("change", scheduleMeasure);
    } else {
      media.addListener(scheduleMeasure);
    }

    let observer;
    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(scheduleMeasure);
      observer.observe(scroller);
      observer.observe(track);
      for (const child of scroller.children) observer.observe(child);
    }

    schedule();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleMeasure);
      if (media.removeEventListener) {
        media.removeEventListener("change", scheduleMeasure);
      } else {
        media.removeListener(scheduleMeasure);
      }
      observer?.disconnect();
      track.hidden = true;
    };
  }, [scrollRef, trackRef, thumbRef, contentKey, mediaQuery]);
}
