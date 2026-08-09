import type { Metadata } from "next";
import Link from "next/link";
import ProjectsExplorer from "@/components/portfolio/ProjectsExplorer";
import ProjectsHeroStrip from "@/components/portfolio/ProjectsHeroStrip";
import { profile, projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description:
    "A curated collection of production projects across event infrastructure, Web3 ecosystem platforms, healthcare admin systems, and token-powered products.",
};

export default function ProjectsPage() {
  return (
    <main className="site-shell projects-page">
      <section className="section projects-page-head">
        <p className="eyebrow">Projects</p>
        <h1>Production work across Web2 and Web3 product categories</h1>
        <p className="hero-copy">
          Explore detailed project case studies, implementation context, and the
          business outcomes each build was designed to support.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-ghost" href="/#projects">
            Back to portfolio
          </Link>
        </div>

        <ProjectsHeroStrip projects={projects} />
      </section>

      <section className="section projects-page-list">
        <ProjectsExplorer projects={projects} />
      </section>
    </main>
  );
}
