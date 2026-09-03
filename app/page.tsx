import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 flex flex-col items-center text-center gap-6">
          <Image
            src="/eeyung.jpg"
            alt="Eeyung Emmanuel"
            width={160}
            height={160}
            className="rounded-full object-cover w-40 h-40"
            priority
          />
          <h1 className="font-serif text-4xl sm:text-5xl">
            Eeyung Emmanuel
          </h1>
          <p className="text-lg text-light max-w-2xl">
            Backend Engineer (Go &amp; Python) | AI/LLM Integration &amp; Multi-Agent Systems
          </p>
          <p className="text-sm text-light/80">
            Currently training as an AI-Native Software Engineer at Learn2Earn.ng
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#projects"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              View Projects
            </a>
            <a href="mailto:eyungemmanuel@gmail.com"
              className="border border-white/40 hover:border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-serif text-3xl text-navy mb-6">About</h2>
          <p className="text-ink leading-relaxed">
            I&apos;m Eeyung Emmanuel, a backend-focused software engineer building
            production systems in Go and Python. I&apos;ve shipped and maintained
            live applications used by real people — from a credit-tracking
            platform serving a 200-person hostel community to a study-and-reflection
            tool used by fellow trainees across multiple campuses — and I build
            multi-agent AI systems from scratch, without relying on existing
            frameworks. Before software, I taught Mathematics and Physics, which
            shaped how I approach engineering: break a hard problem down until
            each piece is small enough to actually understand, then build it back
            up. I&apos;m currently completing an intensive AI-Native Software
            Engineer training program, going deep on full-stack development,
            AI/LLM integration, and backend architecture. I like problems where a
            real person is waiting on the other end of what I ship.
          </p>
        </div>
      </section>

      <section id="skills" className="bg-light">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif text-3xl text-navy mb-10">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border-l-4 border-accent pl-5">
              <h3 className="text-navy font-semibold mb-2">Languages</h3>
              <p className="text-ink">Go (Golang), Python, SQL</p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <h3 className="text-navy font-semibold mb-2">Backend &amp; APIs</h3>
              <p className="text-ink">
                REST API design, handler/service/repository architecture,
                JWT/bcrypt authentication, goroutines &amp; concurrency
              </p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <h3 className="text-navy font-semibold mb-2">AI / LLM</h3>
              <p className="text-ink">
                Multi-agent system design, LLM API integration (Groq), prompt
                engineering
              </p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <h3 className="text-navy font-semibold mb-2">Tools</h3>
              <p className="text-ink">
                Git, Docker, Render, Vercel, Turso, HTTP/JSON, unit testing
                (httptest, table-driven tests)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif text-3xl text-navy mb-10">Projects</h2>
          <div className="grid sm:grid-cols-2 gap-8">

            <div className="bg-light rounded-md p-6 flex flex-col gap-3">
              <h3 className="text-navy font-semibold text-lg">CRDLedger</h3>
              <p className="text-ink text-sm">
                Credit-tracking web app for a 200-person hostel economy. Live in
                production with bcrypt auth, mutual-consent transactions,
                role-aware dashboards, and a mobile PWA.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Go</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">PostgreSQL/Turso</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Render</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">PWA</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <a href="https://crdledger.onrender.com"
                  className="text-accent hover:underline"
                >
                  Live Site
                </a>
                <a href="https://github.com/eeyung1/crdledger"
                  className="text-accent hover:underline"
                >
                  View Code
                </a>
              </div>
            </div>

            <div className="bg-light rounded-md p-6 flex flex-col gap-3">
              <h3 className="text-navy font-semibold text-lg">L2EStudyLink</h3>
              <p className="text-ink text-sm">
                Peer-to-peer study, timetable, and reflection platform used by
                students across multiple campuses in the Learn2Earn program.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Go</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Gin</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">PostgreSQL</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">JWT Auth</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <a href="https://l2estudylink.onrender.com"
                  className="text-accent hover:underline"
                >
                  Live Site
                </a>
                <a href="https://github.com/eeyung1/L2EStudyLink"
                  className="text-accent hover:underline"
                >
                  View Code
                </a>
              </div>
            </div>

            <div className="bg-light rounded-md p-6 flex flex-col gap-3">
              <h3 className="text-navy font-semibold text-lg">
                CRDLedger × BMONI Settlement Integration
              </h3>
              <p className="text-ink text-sm">
                An NGN rails integration connecting CRDLedger&apos;s
                credit-tracking to real bank settlement — verify a bank account,
                register a beneficiary, and initiate a withdrawal, built against
                BMONI Embedded&apos;s wallet API for a live hackathon exhibition.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Python</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Flask</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">BMONI API</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">eth_account</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <a href="https://github.com/eeyung1/crdledger-bmoni-settlement"
                  className="text-accent hover:underline"
                >
                  View Code
                </a>
              </div>
            </div>

            <div className="bg-light rounded-md p-6 flex flex-col gap-3">
              <h3 className="text-navy font-semibold text-lg">Groupie-Tracker</h3>
              <p className="text-ink text-sm">
                External API data explorer with goroutine-based parallel
                fetching (8x speed improvement), geolocation mapping, and a
                full table-driven test suite.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Go</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Concurrency</span>
                <span className="text-xs bg-white text-navy px-2 py-1 rounded">Testing</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <a href="https://github.com/eeyung1/Practice-code/tree/main/groupie-tracker"
                  className="text-accent hover:underline"
                >
                  View Code
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 flex flex-col items-center text-center gap-6">
          <h2 className="font-serif text-3xl">Get in Touch</h2>
          <p className="text-light max-w-md">
            Open to internship and collaboration opportunities. The fastest
            way to reach me is email.
          </p>
          <a href="mailto:eyungemmanuel@gmail.com"
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            eyungemmanuel@gmail.com
          </a>
          <div className="flex gap-6 mt-4 text-light">
            <a href="https://www.linkedin.com/in/emmanuel-eyung-882331425"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a href="https://github.com/eeyung1"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="https://x.com/eyungchess"
              className="hover:text-white transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
