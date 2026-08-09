"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

type ProjectHeroMediaProps = {
  title: string;
  kind: string;
  thumbnail: string;
  thumbnailAlt: string;
  previewTone: "cyan" | "green" | "mint" | "violet";
};

export default function ProjectHeroMedia({
  title,
  kind,
  thumbnail,
  thumbnailAlt,
  previewTone,
}: ProjectHeroMediaProps) {
  const [missing, setMissing] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`case-hero-media tone-${previewTone} project-preview-trigger`}
        onClick={() => setShowLightbox(true)}
        aria-label={`Open ${title} hero image preview`}
      >
        {!missing ? (
          <Image
            src={thumbnail}
            alt={thumbnailAlt}
            fill
            sizes="(max-width: 980px) 100vw, 1120px"
            className="project-image"
            onError={() => setMissing(true)}
            priority
          />
        ) : null}

        <div className="case-hero-meta">
          <p>{kind}</p>
          <h2>{title}</h2>
        </div>
      </button>

      {showLightbox ? (
        <ImageLightbox
          images={[{ src: thumbnail, alt: thumbnailAlt }]}
          initialIndex={0}
          onClose={() => setShowLightbox(false)}
        />
      ) : null}
    </>
  );
}
