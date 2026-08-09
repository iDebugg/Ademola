"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/portfolio-data";
import { buttonVariants } from "@/components/ui/Button";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export default function HeaderNav() {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

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
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="site-shell nav-wrap">
        <a className="brand" href="#hero" aria-label={`Go to ${profile.name} introduction`}>
          <span className="brand-mark" aria-hidden="true">
            <Image
              src="/myProfile.jpg"
              alt=""
              width={26}
              height={26}
              className="brand-mark-image"
            />
          </span>
          <span>{profile.name}</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav id="primary-nav" className={menuOpen ? "nav-open" : undefined} aria-label="Primary">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a className={`${buttonVariants({ variant: "primary", size: "sm" })} desktop-cta`} href={`mailto:${profile.email}`}>
          Email me
        </a>
      </div>
    </header>
  );
}
