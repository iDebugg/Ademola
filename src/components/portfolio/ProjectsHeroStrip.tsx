"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import type { Project } from "@/lib/portfolio-data";

type ProjectsHeroStripProps = {
  projects: Project[];
};

export default function ProjectsHeroStrip({ projects }: ProjectsHeroStripProps) {
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featured = useMemo(() => projects.slice(0, 4), [projects]);
  const lightboxImages = useMemo(
    () => featured.map((project) => ({ src: project.thumbnail, alt: project.thumbnailAlt })),
    [featured],
  );

  return (
    <div className="projects-hero-strip" aria-label="Featured project previews">
      {featured.map((project, index) => (
        <article key={project.slug} className="projects-hero-item">
          <button
            type="button"
            className={`projects-hero-image tone-${project.previewTone} project-preview-trigger`}
            onClick={() => setLightboxIndex(index)}
            aria-label={`Open ${project.title} preview image`}
          >
            {!missingImages[project.slug] ? (
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt}
                fill
                sizes="(max-width: 980px) 100vw, 25vw"
                className="project-image"
                onError={() => {
                  setMissingImages((current) => ({ ...current, [project.slug]: true }));
                }}
              />
            ) : null}
          </button>
          <div className="projects-hero-copy">
            <p>{project.kind}</p>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
          </div>
        </article>
      ))}

      {lightboxIndex !== null ? (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  );
}
