"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const hasMultiple = images.length > 1;
  const safeIndex = useMemo(() => {
    if (images.length === 0) {
      return 0;
    }
    if (activeIndex < 0) {
      return images.length - 1;
    }
    if (activeIndex >= images.length) {
      return 0;
    }
    return activeIndex;
  }, [activeIndex, images.length]);

  const activeImage = images[safeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!hasMultiple) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasMultiple, images.length, onClose]);

  if (!activeImage) {
    return null;
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button className="lightbox-backdrop" type="button" onClick={onClose} aria-label="Close preview" />
      <div className="lightbox-content">
        <div className="lightbox-toolbar">
          {hasMultiple ? <p className="lightbox-count">{safeIndex + 1} / {images.length}</p> : <span />}
          <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image preview">
            Close
          </button>
        </div>

        <div className="lightbox-image-wrap">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="100vw"
            className="lightbox-image"
            priority
          />

          {hasMultiple ? (
            <>
              <button
                type="button"
                className="lightbox-nav lightbox-nav-prev"
                aria-label="View previous image"
                onClick={() => setActiveIndex((current) => (current - 1 + images.length) % images.length)}
              >
                Prev
              </button>
              <button
                type="button"
                className="lightbox-nav lightbox-nav-next"
                aria-label="View next image"
                onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
              >
                Next
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
