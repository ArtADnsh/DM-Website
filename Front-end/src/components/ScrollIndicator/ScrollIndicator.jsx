import { useRef } from "react";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";

/** Decorative indicator; scrolling updates its DOM without rendering the page. */
function ScrollIndicator({ scrollRef, contentKey, trackClassName, thumbClassName }) {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useScrollIndicator(scrollRef, trackRef, thumbRef, contentKey);

  return (
    <div ref={trackRef} className={trackClassName} hidden aria-hidden="true">
      <div ref={thumbRef} className={thumbClassName} />
    </div>
  );
}

export default ScrollIndicator;
