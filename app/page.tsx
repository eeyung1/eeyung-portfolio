import Image from "next/image";
import { ProjectGrid } from "@/components/project-grid";
import { Contact } from "@/components/contact";
import { Activity } from "@/components/activity";
import { services, profile } from "@/lib/portfolio";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> SOFTWARE ENGINEER · PRODUCT BUILDER
          </p>
          <h1>
            Good ideas deserve
            <br />
            to become
            <br />
            <em>working products.</em>
          </h1>
          <p className="hero-description">
            I’m Emmanuel Eyung. I build thoughtful web applications, reliable
            backends, and AI-powered workflows that solve problems for real
            people.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              Explore my work <span>↘</span>
            </a>
            <a className="text-link" href="#contact">
              Let’s build something <span>↗</span>
            </a>
          </div>
          <div className="hero-footnote">
            <span className="small-line" /> Based in Nigeria. Building for
            people everywhere.
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            <Image
              src="/eeyung.jpg"
              alt="Emmanuel Eyung, software engineer and product builder"
              width={640}
              height={640}
              priority
              sizes="(max-width: 760px) 90vw, 40vw"
            />
            <div className="portrait-caption">
              <span>EMMANUEL EYUNG</span>
              <span>THE PERSON BEHIND THE CODE ↗</span>
            </div>
          </div>
          <div className="portrait-stamp">
            <span>IDEA TO</span>
            <strong>impact.</strong>
            <span>ONE RELEASE AT A TIME</span>
          </div>
          <span className="portrait-index">01 / INTRODUCTION</span>
        </div>
      </section>
      <div className="expertise-strip">
        <div className="container">
          <span>FROM INTERFACE TO INFRASTRUCTURE</span>
          <p>
            Go <i>✳</i> Python <i>✳</i> React & Next.js <i>✳</i> PostgreSQL{" "}
            <i>✳</i> AI & LLMs
          </p>
        </div>
      </div>
      <section id="work" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>
              Real problems.
              <br />
              <em>Considered solutions.</em>
            </h2>
          </div>
          <p>
            A closer look at the products I build and the engineering behind
            them. Explore the decisions, the code, and the work still ahead.
          </p>
        </div>
        <ProjectGrid />
      </section>
      <section id="about" className="about-section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">02 / THE ENGINEER BEHIND THE WORK</p>
            <h2>
              Curiosity started it.
              <br />
              <em>Care keeps it going.</em>
            </h2>
            <div className="about-note">
              <span>“</span>
              <p>
                I like problems where a real person is waiting on the other end
                of what I ship.
              </p>
            </div>
          </div>
          <div className="about-copy">
            <p className="lead">
              Before software, I taught Mathematics and Physics. That experience
              still shapes how I build: understand the problem, make the
              difficult parts clear, and help people move forward.
            </p>
            <p>
              Today, I’m a backend-focused software engineer working across Go,
              Python, databases, web interfaces and AI integrations. My work
              spans learning platforms, everyday finance, voice-driven inventory
              and multi-agent development workflows.
            </p>
            <p>
              I bring the same attention to a small interface detail as I do to
              the system behind it. A product needs to make sense to its users,
              protect their data, and stay understandable for the next person
              working on the code.
            </p>
            <div className="skill-groups">
              <div>
                <h3>Backend & data</h3>
                <p>
                  Go · Python · SQL · REST APIs
                  <br />
                  PostgreSQL · Authentication
                </p>
              </div>
              <div>
                <h3>Interfaces & delivery</h3>
                <p>
                  React · Next.js · TypeScript
                  <br />
                  GitHub · Docker · Render · Vercel
                </p>
              </div>
              <div>
                <h3>AI & automation</h3>
                <p>
                  LLM integrations · LangGraph
                  <br />
                  Agent coordination · Prompt design
                </p>
              </div>
              <div>
                <h3>Engineering practice</h3>
                <p>
                  Testing · CI/CD · Code review
                  <br />
                  Debugging · Clear documentation
                </p>
              </div>
            </div>
            <a className="text-link" href={profile.linkedin}>
              More about my journey <span>↗</span>
            </a>
          </div>
        </div>
      </section>
      <section id="services" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / HOW I CAN HELP</p>
            <h2>
              Your next step,
              <br />
              <em>built together.</em>
            </h2>
          </div>
          <p>
            From a new idea to a system that needs attention, I can help turn
            the next challenge into a clear, deliverable piece of work.
          </p>
        </div>
        <div className="services-list">
          {services.map((s) => (
            <article key={s.number}>
              <span className="service-number">{s.number}</span>
              <h3>{s.title}</h3>
              <div>
                <p>{s.description}</p>
                <small>{s.deliverables}</small>
              </div>
              <a
                href="#contact"
                aria-label={`Discuss ${s.title.toLowerCase()}`}
              >
                ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / THE WAY I WORK</p>
              <h2>
                Clear thinking.
                <br />
                <em>Visible progress.</em>
              </h2>
            </div>
            <p>
              You should know what is being built, why it matters, and how we
              will know it works.
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "01",
                "Understand",
                "Start with the people, the problem and the existing system. Agree on a useful, achievable outcome.",
              ],
              [
                "02",
                "Build",
                "Work in focused increments, with readable code and progress you can review along the way.",
              ],
              [
                "03",
                "Verify",
                "Check the important user journeys, edge cases and deployment requirements before calling it done.",
              ],
              [
                "04",
                "Hand over",
                "Deliver the source, explain the decisions and document what you need to run and improve the product.",
              ],
            ].map(([n, title, body]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <Activity />
      </section>
      <Contact />
    </main>
  );
}
