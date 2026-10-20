export const profile = {
  name: "Emmanuel Eyung",
  email: "eyungemmanuel@gmail.com",
  github: "https://github.com/eeyung1",
  linkedin: "https://www.linkedin.com/in/emmanuel-eyung-882331425",
  x: "https://x.com/eeyung1",
  whatsapp: "https://wa.me/2348128162561",
  phone: "+2348128162561",
  site: "https://eeyung.vercel.app",
};

export type Project = {
  slug: string;
  name: string;
  category: "Product engineering" | "AI & automation" | "APIs & integrations";
  subtitle: string;
  description: string;
  stack: string[];
  repo: string;
  live?: string;
  status: string;
  role: string;
  problem: string;
  approach: string[];
  outcome: string;
  next: string;
  accent: string;
  mark: string;
};

export const projects: Project[] = [
  {
    slug: "listenledger",
    name: "ListenLedger",
    category: "Product engineering",
    subtitle: "From shop conversations to a trusted ledger.",
    description:
      "A voice-driven sales and inventory system that connects counter capture, stock movements, and human review.",
    stack: ["Go", "TypeScript", "PostgreSQL", "Web Speech API"],
    repo: "https://github.com/eeyung1/listenledger",
    live: "https://listenledger.onrender.com",
    status: "Active development",
    role: "Product builder · Backend & frontend",
    problem:
      "Recording a sale should not interrupt serving a customer. Small shops need a way to capture transactions while keeping their stock and accounts trustworthy.",
    approach: [
      "Built shop-scoped authentication and a ledger with atomic stock movements and retry protection.",
      "Connected browser speech capture to a review workflow so uncertain interpretations can be checked by a person.",
      "Developed responsive counter, inventory and reporting flows, with PostgreSQL migrations and a restricted production database role.",
    ],
    outcome:
      "The repository brings transaction capture, inventory and review into one product. The application has been deployed on Render with Supabase-backed PostgreSQL.",
    next: "Real-device and real-shop acceptance remain essential. Voice accuracy and pilot outcomes are not presented as established results.",
    accent: "sage",
    mark: "LL",
  },
  {
    slug: "l2estudylink",
    name: "L2EStudyLink",
    category: "Product engineering",
    subtitle: "A learning community, with structure.",
    description:
      "Study planning, peer tutoring, session booking and reflection in a connected learning platform.",
    stack: ["Go", "Gin", "PostgreSQL", "Brevo"],
    repo: "https://github.com/eeyung1/L2EStudyLink",
    live: "https://l2estudylink.com",
    status: "Published platform",
    role: "Product builder · Full-stack development",
    problem:
      "Learners need more than a list of goals. They need a practical connection between their schedule, what they actually learn, and the people who can help them progress.",
    approach: [
      "Connected skills and tutor availability with booking, timetables and study reflections.",
      "Implemented account recovery through email codes and session protection with HttpOnly cookies.",
      "Added a public Learning Hub with authenticated discussions, replies and admin moderation.",
    ],
    outcome:
      "A Go-backed platform combines personal study organisation and peer learning, with an installable web experience and a public learning hub.",
    next: "Continue improving reliability and mobile usability as the learning community grows.",
    accent: "lavender",
    mark: "L2E",
  },
  {
    slug: "crdledger",
    name: "CRDLedger",
    category: "Product engineering",
    subtitle: "Make everyday credit easier to trust.",
    description:
      "A credit-tracking application with mutual-consent transactions, clear balances and role-aware dashboards.",
    stack: ["Go", "SQL", "HTMX", "PWA"],
    repo: "https://github.com/eeyung1/crdledger",
    live: "https://crdledger.onrender.com",
    status: "Published application",
    role: "Product builder · Backend & interface",
    problem:
      "Informal credit is easy to record inconsistently. Both sides need a shared account of what is owed and a clear way to acknowledge repayment.",
    approach: [
      "Modelled seller and buyer workflows with mutual-consent records and role-aware actions.",
      "Built balance views and debt netting so the interface communicates the actual amount owed.",
      "Used Go templates and progressive enhancement for a lightweight mobile experience, with CSRF protection, rate limits and secure sessions.",
    ],
    outcome:
      "A focused ledger experience for everyday credit, with searchable transactions, repayment updates and mobile installation support.",
    next: "Keep balances authoritative and refine the experience using real transaction workflows.",
    accent: "sand",
    mark: "CRD",
  },
  {
    slug: "multi-agent-orchestrator",
    name: "Multi-agent orchestrator",
    category: "AI & automation",
    subtitle: "Give AI work a deliberate workflow.",
    description:
      "A planner-to-worker orchestration system for coordinating frontend and backend generation with configurable model providers.",
    stack: ["Python", "LangGraph", "LLM APIs", "pytest"],
    repo: "https://github.com/eeyung1/multi-agent-orchestrator",
    status: "Engineering project",
    role: "AI workflow development",
    problem:
      "Generating software across several models requires more than a single prompt: tasks need boundaries, outputs need validation, and failures need to remain visible.",
    approach: [
      "Structured planning and parallel frontend/backend workers around explicit file tasks.",
      "Supported provider configuration, role-specific models and bounded retries.",
      "Separated generated artifacts from filesystem writes, with workspace boundary checks and regression tests.",
    ],
    outcome:
      "A configurable orchestration foundation and a documented activation protocol for agents joining collaborative projects.",
    next: "Artifact validation does not establish generated-code correctness. Test execution and product acceptance remain separate steps.",
    accent: "ink",
    mark: "AI",
  },
  {
    slug: "bmoni-settlement",
    name: "CRDLedger × BMONI",
    category: "APIs & integrations",
    subtitle: "Connect a ledger to settlement rails.",
    description:
      "A hackathon integration exploring bank account verification, beneficiary registration and withdrawal initiation.",
    stack: ["Python", "Flask", "BMONI API"],
    repo: "https://github.com/eeyung1/crdledger-bmoni-settlement",
    status: "Hackathon integration",
    role: "API integration development",
    problem:
      "A credit ledger records obligations; a settlement integration explores how users could move from a recorded balance to a payment workflow.",
    approach: [
      "Integrated BMONI Embedded wallet endpoints into a Python application.",
      "Connected account verification, beneficiary registration and withdrawal initiation into a demonstrable flow.",
      "Kept the settlement integration separate from the main ledger application.",
    ],
    outcome:
      "An integration built for a hackathon exhibition, demonstrating the connection between ledger workflows and external payment APIs.",
    next: "This is an integration demonstration, not a claim of production financial-service readiness.",
    accent: "peach",
    mark: "↗",
  },
  {
    slug: "groupie-tracker",
    name: "Groupie Tracker",
    category: "APIs & integrations",
    subtitle: "Turn external data into an explorable experience.",
    description:
      "An API data explorer combining concurrent fetching, geolocation mapping and table-driven tests.",
    stack: ["Go", "Goroutines", "REST APIs", "Testing"],
    repo: "https://github.com/eeyung1/Practice-code/tree/main/groupie-tracker",
    status: "Engineering project",
    role: "Go development",
    problem:
      "External APIs can leave an interface waiting on several independent requests. The challenge is to organise that data and handle concurrent work clearly.",
    approach: [
      "Used goroutines to fetch independent API resources concurrently.",
      "Connected the resulting data to an explorer with location mapping.",
      "Used table-driven tests to check expected behaviour and edge cases.",
    ],
    outcome:
      "A practical demonstration of Go concurrency, external API integration and testing discipline.",
    next: "Performance claims require reproducible measurements; no unverified speed multiplier is used here.",
    accent: "blue",
    mark: "GT",
  },
];

export const services = [
  {
    number: "01",
    title: "Build your product",
    description:
      "Turn a clear idea into a working web application: user journeys, accounts, dashboards, APIs and the database behind them.",
    deliverables: "MVPs · Web applications · Internal tools",
  },
  {
    number: "02",
    title: "Connect your systems",
    description:
      "Bring payments, email, authentication and third-party data into a workflow that makes sense for your business.",
    deliverables: "REST APIs · Integrations · Backend engineering",
  },
  {
    number: "03",
    title: "Make AI useful",
    description:
      "Integrate language models and design bounded agent workflows around a real task, with clear outputs and human review where it matters.",
    deliverables: "LLM integration · Agent workflows · Automation",
  },
  {
    number: "04",
    title: "Get it ready to ship",
    description:
      "Investigate deployment failures, improve mobile interfaces, add meaningful checks and turn an unfinished application into a reviewable release.",
    deliverables: "Debugging · CI/CD · Product improvements",
  },
];
