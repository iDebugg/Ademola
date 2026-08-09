import HeaderNav from "@/components/portfolio/HeaderNav";
import Link from "next/link";
import ProjectsExplorer from "@/components/portfolio/ProjectsExplorer";
import AnimatedCount from "@/components/portfolio/AnimatedCount";
import ContactForm from "@/components/portfolio/ContactForm";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import HeroTypewriter from "@/components/ui/HeroTypewriter";
import { buttonVariants } from "@/components/ui/Button";
import {
  blogPosts,
  experienceTimeline,
  profile,
  projects,
  servicePackages,
  services,
  skillGroups,
  socialLinks,
  testimonials,
  trustSignals,
} from "@/lib/portfolio-data";

export default function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <HeaderNav />

      <main id="main-content" className="site-shell">
        <SectionReveal id="hero" className="section hero" delay={0.02}>
          <div className="hero-frame">
            <p className="eyebrow">{profile.role}</p>
            <h1>
              Building premium web products that look sharp, feel fast, and solve
              real business problems.
            </h1>
            <HeroTypewriter
              as="p"
              className="hero-copy hero-copy-typed"
              prefix=""
              text="I am Ademola, a JavaScript and Next.js developer focused on creating high-performance digital products with thoughtful UX and practical AI capabilities."
            />
            <div className="hero-actions">
              <a className={buttonVariants({ variant: "primary" })} href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className={buttonVariants({ variant: "ghost" })} href="#projects">
                View projects
              </a>
            </div>
          </div>
          <ul className="hero-metrics" aria-label="Quick profile highlights">
            <li>
              <strong>
                <AnimatedCount value={projects.length} />
              </strong>
              <span>Featured projects</span>
            </li>
            <li>
              <strong>
                <AnimatedCount value={services.length} />
              </strong>
              <span>Service offerings</span>
            </li>
            <li>
              <strong>
                <AnimatedCount value={experienceTimeline.length} />
              </strong>
              <span>Career stages</span>
            </li>
          </ul>

          <div className="hero-proof-strip" aria-label="Proof and delivery signals">
            {trustSignals.map((signal) => (
              <article className="hero-proof-item" key={signal.label}>
                <p className="hero-proof-value">{signal.value}</p>
                <p className="hero-proof-label">{signal.label}</p>
                <p className="hero-proof-detail">{signal.detail}</p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="about" className="section" delay={0.08}>
          <SectionHeading
            eyebrow="About"
            title="Engineering with product intent, not just code delivery"
          />
          <p className="section-copy">
            I help teams turn ideas into reliable web experiences. My approach
            combines product thinking, clean architecture, and polished frontend
            execution. I focus on outcomes: faster launches, stronger user
            journeys, and systems you can scale with confidence.
          </p>
        </SectionReveal>

        <SectionReveal id="projects" className="section" delay={0.12}>
          <SectionHeading eyebrow="Projects" title="Selected work in progress-ready formats" />
          <ProjectsExplorer projects={projects} />
          <div className="projects-cta-wrap">
            <Link className={buttonVariants({ variant: "ghost" })} href="/projects">
              Browse all case studies
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal id="testimonials" className="section" delay={0.15}>
          <SectionHeading
            eyebrow="Testimonials"
            title="What collaborators say about working with me"
          />
          <div className="card-grid testimonial-grid">
            {testimonials.map((testimonial) => (
              <Card tone="testimonial" key={`${testimonial.name}-${testimonial.role}`}>
                <p className="testimonial-mark" aria-hidden="true">
                  01
                </p>
                <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="services" className="section" delay={0.18}>
          <SectionHeading eyebrow="Services" title="What I can build for your team" />
          <div className="package-grid" aria-label="Freelance engagement packages">
            {servicePackages.map((pkg) => (
              <Card className="package-card" key={pkg.name}>
                <p className="package-timeline">{pkg.timeline}</p>
                <h3>{pkg.name}</h3>
                <p>{pkg.idealFor}</p>
                <ul className="package-outcomes">
                  {pkg.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className={buttonVariants({ variant: "ghost" })} href={`mailto:${profile.email}`}>
                  {pkg.ctaLabel}
                </a>
              </Card>
            ))}
          </div>

          <p className="services-subhead">Core capabilities</p>
          <div className="card-grid">
            {services.map((service) => (
              <Card key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="skills" className="section" delay={0.2}>
          <SectionHeading
            eyebrow="Skills"
            title="Tools and technologies I use to ship confidently"
          />
          <div className="card-grid">
            {skillGroups.map((group) => (
              <Card key={group.category}>
                <h3>{group.category}</h3>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="experience" className="section" delay={0.22}>
          <SectionHeading
            eyebrow="Experience"
            title="A timeline of focused product and engineering growth"
          />
          <ol className="timeline">
            {experienceTimeline.map((entry) => (
              <li key={`${entry.role}-${entry.period}`}>
                <Card tone="timeline">
                  <p className="timeline-period">{entry.period}</p>
                  <h3>{entry.role}</h3>
                  <p className="timeline-org">{entry.org}</p>
                  <ul>
                    {entry.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ol>
        </SectionReveal>

        <SectionReveal id="blog" className="section" delay={0.24}>
          <SectionHeading
            eyebrow="Blog Preview"
            title="Notes on software, UX, and AI product delivery"
          />
          <div className="card-grid">
            {blogPosts.map((post) => (
              <Card key={post.title}>
                <p className="meta">{post.readTime}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="read-more">Full post soon</span>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="section contact" delay={0.28}>
          <SectionHeading eyebrow="Contact" title="Let us build something high-impact together" />
          <p className="section-copy">
            Need a React, Next.js, or AI-focused web engineer for your next
            product milestone? Reach out and I will reply with a clear next step.
          </p>
          <div className="contact-layout">
            <ContactForm />
            <div className="contact-direct">
              <h3>Prefer direct email?</h3>
              <p>
                Send a message directly and I will respond with next steps, scope
                guidance, and timeline options.
              </p>
              <a className={buttonVariants({ variant: "primary" })} href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          </div>
          <ul className="social-list" aria-label="Social profiles">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-wrap">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
          <a href={`mailto:${profile.email}`}>Email me</a>
        </div>
      </footer>
    </>
  );
}
