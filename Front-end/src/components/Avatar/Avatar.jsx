import { useState } from "react";
import { getInitials } from "../../utils/people";

/**
 * Person photo with an initials fallback. The fallback is shown when there is
 * no image or when the image fails to load.
 *
 * Sizing/colours live in the parent card's CSS, passed in via the class props.
 */
function Avatar({ name, image, imageClassName, fallbackClassName }) {
  const [failedImage, setFailedImage] = useState(null);

  if (image && failedImage !== image) {
    return (
      <img
        loading="lazy"
        decoding="async"
        src={image}
        alt={name}
        className={imageClassName}
        onError={() => setFailedImage(image)}
      />
    );
  }

  return (
    <div className={fallbackClassName} role="img" aria-label={name}>
      {getInitials(name)}
    </div>
  );
}

export default Avatar;
