"use client";

import { useEffect, useState } from "react";

type TocLink = {
  id: string;
  label: string;
};

type CaseStudyTocProps = {
  links: TocLink[];
};

export default function CaseStudyToc({ links }: CaseStudyTocProps) {
  const [activeId, setActiveId] = useState<string>(links[0]?.id ?? "");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className="case-toc" aria-label="Case study sections">
      <ul>
        {links.map((link) => {
          const isActive = activeId === link.id;
          return (
            <li key={link.id}>
              <a
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "true" : undefined}
                href={`#${link.id}`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
