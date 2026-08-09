"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import Card from "@/components/ui/Card";
import type { Project } from "@/lib/portfolio-data";

type ProjectsExplorerProps = {
  projects: Project[];
};

function getHostName(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeKind, setActiveKind] = useState("All");
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const kinds = useMemo(() => {
    return ["All", ...new Set(projects.map((project) => project.kind))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeKind === "All") {
      return projects;
    }
    return projects.filter((project) => project.kind === activeKind);
  }, [activeKind, projects]);

  const lightboxImages = useMemo(
    () => filteredProjects.map((project) => ({ src: project.thumbnail, alt: project.thumbnailAlt })),
    [filteredProjects],
  );

  return (
    <>
      <div className="project-filter-wrap" role="tablist" aria-label="Project category filters">
        {kinds.map((kind) => {
          const selected = activeKind === kind;
          return (
            <button
              type="button"
              key={kind}
              className={`project-filter-pill${selected ? " active" : ""}`}
              aria-pressed={selected}
              onClick={() => setActiveKind(kind)}
            >
              {kind}
            </button>
          );
        })}
      </div>

      <div className="card-grid card-grid-projects">
        {filteredProjects.map((project, index) => (
          <Card tone="project" key={project.slug}>
            <button
              type="button"
              className={`project-visual tone-${project.previewTone} project-preview-trigger`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open ${project.title} thumbnail preview`}
            >
              {!missingImages[project.slug] ? (
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt}
                  fill
                  sizes="(max-width: 980px) 100vw, 50vw"
                  className="project-image"
                  onError={() => {
                    setMissingImages((current) => ({ ...current, [project.slug]: true }));
                  }}
                />
              ) : null}
              <span>{project.kind}</span>
            </button>
            <div className="project-head">
              <p className="project-host">{getHostName(project.liveUrl)}</p>
              <p className="project-index">{String(index + 1).padStart(2, "0")}</p>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p>{project.summary}</p>
            <ul className="project-impact" aria-label={`${project.title} outcomes`}>
              {project.impact.slice(0, 2).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="card-actions">
              <Link href={`/projects/${project.slug}`}>Case study</Link>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live project
              </a>
            </div>
          </Card>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  );
}
