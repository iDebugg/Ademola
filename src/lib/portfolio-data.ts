export type NavLink = {
  label: string;
  href: `#${string}`;
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  thumbnail: string;
  thumbnailAlt: string;
  summary: string;
  challenge: string;
  outcome: string;
  impact: string[];
  stack: string[];
  liveUrl: string;
  previewTone: "cyan" | "green" | "mint" | "violet";
  repoUrl?: string;
};

export type Experience = {
  period: string;
  role: string;
  org: string;
  highlights: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type TrustSignal = {
  value: string;
  label: string;
  detail: string;
};

export type ServicePackage = {
  name: string;
  idealFor: string;
  timeline: string;
  outcomes: string[];
  ctaLabel: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type BlogPost = {
  title: string;
  excerpt: string;
  readTime: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const profile = {
  name: "Ademola",
  role: "Software Engineer",
  email: "aderibigbevictor79@gmail.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    slug: "accexafrica-organizer-dashboard",
    title: "AccexAfrica Organizer Dashboard",
    kind: "Event Infrastructure",
    thumbnail: "/projects/accexafrica.png",
    thumbnailAlt: "AccexAfrica dark organizer dashboard with event cards and side navigation",
    summary:
      "Organizer-facing event platform for publishing events, managing attendees, monitoring ticket flow, and coordinating check-ins.",
    challenge:
      "Event organizers needed one control plane for ticketing, attendee operations, and financial visibility across multiple events.",
    outcome:
      "Delivered a dark-themed operational dashboard with clear event cards, category filtering, and transaction-aware ticket workflows.",
    impact: [
      "Unified ticketing, attendee, and wallet operations in one interface.",
      "Reduced organizer friction with at-a-glance event status and inventory context.",
      "Strengthened operator confidence with consistent event management flows.",
    ],
    stack: ["Next.js", "Dashboard UX", "Ticketing", "Wallet Flows"],
    liveUrl: "https://app.accexafrica.com/dashboardorg",
    previewTone: "cyan",
  },
  {
    slug: "toroforge-collective",
    title: "ToroForge Collective",
    kind: "Web3 Ecosystem",
    thumbnail: "/projects/toroforge.png",
    thumbnailAlt: "ToroForge green hero section with blockchain-themed network background",
    summary:
      "Developer ecosystem website for the Toronet blockchain, showcasing grants, docs, community resources, and builder onboarding.",
    challenge:
      "The ecosystem needed a high-trust landing experience that turns interest into actual builder participation.",
    outcome:
      "Shaped a conversion-focused ecosystem hub with clear value framing, documentation pathways, and community action prompts.",
    impact: [
      "Clarified the builder journey from discovery to documentation and grants.",
      "Improved ecosystem storytelling with sharper information hierarchy.",
      "Increased action intent through prominent Start Building pathways.",
    ],
    stack: ["Next.js", "Web3 Content", "Motion UI", "Developer Onboarding"],
    liveUrl: "https://www.toroforgecollective.com/",
    previewTone: "green",
  },
  {
    slug: "medeet-admin-dashboard",
    title: "Medeet Admin Dashboard",
    kind: "HealthTech Admin",
    thumbnail: "/projects/Medeet.jpg",
    thumbnailAlt: "Medeet admin dashboard with patient and doctor analytics cards",
    summary:
      "Admin experience for a healthcare platform with operational analytics, patient management workflows, and consultation oversight.",
    challenge:
      "Clinical operations teams required a clean, role-aware dashboard to monitor activity and drive faster administrative decisions.",
    outcome:
      "Implemented a lightweight admin layout with KPI cards, analytics panels, and clear module navigation for medical operations.",
    impact: [
      "Centralized patient, doctor, and consultation monitoring.",
      "Improved operational readability with card-based data summaries.",
      "Made admin workflows faster through predictable left-rail navigation.",
    ],
    stack: ["React", "Analytics", "Role-based UI", "Healthcare Operations"],
    liveUrl: "https://admin.medeet.com/login?callbackUrl=%2Fdashboard",
    previewTone: "mint",
  },
  {
    slug: "lu-network",
    title: "Lu Network",
    kind: "Tokenized Connectivity",
    thumbnail: "/projects/Lunetwork.png",
    thumbnailAlt: "Lu Network hero page with bold headline and globe visual",
    summary:
      "Landing and conversion platform for decentralized internet access powered by Sui blockchain token utility and community node operations.",
    challenge:
      "The product needed to explain a technically complex decentralized internet model in a way that feels simple to users and operators.",
    outcome:
      "Produced a polished narrative-driven landing experience connecting token utility, network participation, and onboarding CTAs.",
    impact: [
      "Simplified tokenized connectivity concepts for non-technical users.",
      "Created clear dual conversion paths for users and node operators.",
      "Elevated credibility through structured feature and governance sections.",
    ],
    stack: ["Next.js", "Sui Blockchain", "Web3 UX", "Token Economy"],
    liveUrl: "https://lu-network.vercel.app/",
    previewTone: "violet",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const services: Service[] = [
  {
    title: "Software Engineering",
    description:
      "I design and build robust web applications with strong architecture and maintainable code.",
  },
  {
    title: "JavaScript Development",
    description:
      "I develop fast, scalable frontends and backends using modern JavaScript and TypeScript workflows.",
  },
  {
    title: "React.js & Next.js Development",
    description:
      "I ship performant, SEO-friendly React and Next.js applications with polished UX and responsive design.",
  },
  {
    title: "AI Web Development",
    description:
      "I integrate AI features into web products to automate tasks, improve user flows, and unlock new experiences.",
  },
];

export const trustSignals: TrustSignal[] = [
  {
    value: "4+",
    label: "Production Projects",
    detail: "Shipped across Web3, HealthTech, and event operations.",
  },
  {
    value: "Fast",
    label: "Execution Rhythm",
    detail: "Clear milestones, short feedback cycles, and reliable handoff.",
  },
  {
    value: "High",
    label: "UX Quality",
    detail: "Interfaces designed for adoption, clarity, and conversion.",
  },
];

export const servicePackages: ServicePackage[] = [
  {
    name: "Landing Page Sprint",
    idealFor: "Founders launching a product or waitlist",
    timeline: "5-7 days",
    outcomes: [
      "Premium responsive landing page with clear conversion path",
      "Performance-first implementation with polished interactions",
      "Launch-ready deployment guidance",
    ],
    ctaLabel: "Start a landing sprint",
  },
  {
    name: "Product UI Build",
    idealFor: "Teams needing a reliable frontend for core flows",
    timeline: "2-4 weeks",
    outcomes: [
      "Feature-complete React/Next.js UI for key journeys",
      "Reusable component architecture and clean code handoff",
      "Usability-focused iteration support",
    ],
    ctaLabel: "Plan product build",
  },
  {
    name: "AI Feature Integration",
    idealFor: "Products adding practical AI capabilities",
    timeline: "1-2 weeks",
    outcomes: [
      "Context-aware AI workflow integrated into real user tasks",
      "Prompt and response UX tuned for trust and control",
      "Instrumentation-ready structure for future iteration",
    ],
    ctaLabel: "Discuss AI integration",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "API Design", "PostgreSQL", "Prisma"],
  },
  {
    category: "AI & Product",
    items: ["OpenAI APIs", "Prompt Workflows", "Feature Prototyping", "UX Strategy"],
  },
];

export const experienceTimeline: Experience[] = [
  {
    period: "2026 - Present",
    role: "Software Engineer",
    org: "Client Projects and Product Builds",
    highlights: [
      "Built and delivered web products for startups and founders with a strong shipping cadence.",
      "Focused on building user-friendly interfaces and reliable full-stack foundations.",
    ],
  },
  {
    period: "2025 - 2026",
    role: "JavaScript and React Developer",
    org: "Freelance and Collaborative Teams",
    highlights: [
      "Contributed to React and Next.js projects with performance and usability improvements.",
      "Worked across feature delivery, bug fixing, and technical improvements in production codebases.",
    ],
  },
  {
    period: "2024 - 2025",
    role: "Web Developer",
    org: "Independent Learning and Real-World Builds",
    highlights: [
      "Developed practical full-stack projects while deepening JavaScript, APIs, and deployment workflows.",
      "Built a strong base in product thinking, responsive implementation, and software delivery.",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Designing AI Features Users Actually Trust",
    excerpt:
      "A practical guide to adding AI into product flows without sacrificing clarity, control, and adoption.",
    readTime: "6 min read",
  },
  {
    title: "How I Structure Next.js Projects for Speed",
    excerpt:
      "Folder strategy, component boundaries, and performance habits I use to ship faster with fewer regressions.",
    readTime: "5 min read",
  },
  {
    title: "From Idea to MVP in 10 Working Days",
    excerpt:
      "A step-by-step framework for founders who need to validate product direction quickly.",
    readTime: "7 min read",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victor-aderibigbe-a5a9b2279/",
  },
  { label: "GitHub", href: "https://github.com/iDebugg" },
  { label: "X", href: "https://x.com/theguyvictor_23" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ademola translated our product ideas into a polished experience quickly and kept communication clear from kickoff to delivery.",
    name: "Product Lead",
    role: "Event Platform Team",
  },
  {
    quote:
      "Strong frontend execution and great attention to detail. The final build felt fast, reliable, and easier to scale than expected.",
    name: "Technical Co-Founder",
    role: "Web3 Startup",
  },
  {
    quote:
      "The dashboard quality improved significantly. Data became easier to read, and operational actions became much more intuitive.",
    name: "Operations Manager",
    role: "HealthTech Product",
  },
];
