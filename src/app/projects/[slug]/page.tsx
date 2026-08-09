import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyToc from "@/components/portfolio/CaseStudyToc";
import ProjectHeroMedia from "@/components/portfolio/ProjectHeroMedia";
import { getProjectBySlug, profile, projects } from "@/lib/portfolio-data";

const caseLinks = [
  { id: "challenge", label: "Challenge" },
  { id: "delivery", label: "Delivery" },
  { id: "impact", label: "Impact" },
  { id: "stack", label: "Stack" },
];

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: `${profile.name} | Project`,
      description: "Project case study.",
    };
  }

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage(
  props: PageProps<"/projects/[slug]">,
) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-shell case-study-page">
      <div className="section case-study-head">
        <p className="eyebrow">Case Study</p>
        <h1>{project.title}</h1>
        <p className="hero-copy">{project.summary}</p>

        <ProjectHeroMedia
          title={project.title}
          kind={project.kind}
          thumbnail={project.thumbnail}
          thumbnailAlt={project.thumbnailAlt}
          previewTone={project.previewTone}
        />

        <div className="hero-actions">
          <a className="btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Open live project
          </a>
          <Link className="btn btn-ghost" href="/#projects">
            Back to projects
          </Link>
        </div>

        <CaseStudyToc links={caseLinks} />
      </div>

      <section id="challenge" className="section case-grid">
        <article className="card">
          <h2>The Challenge</h2>
          <p>{project.challenge}</p>
        </article>

        <article id="delivery" className="card">
          <h2>What I Delivered</h2>
          <p>{project.outcome}</p>
        </article>
      </section>

      <section id="impact" className="section">
        <div className="section-head">
          <p className="eyebrow">Impact</p>
          <h2>Practical outcomes from this build</h2>
        </div>
        <ul className="case-impact-list">
          {project.impact.map((item) => (
            <li key={item} className="card">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="stack" className="section case-stack-wrap">
        <div className="section-head">
          <p className="eyebrow">Stack</p>
          <h2>Technologies used</h2>
        </div>
        <ul className="tag-list" aria-label={`${project.title} stack`}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
