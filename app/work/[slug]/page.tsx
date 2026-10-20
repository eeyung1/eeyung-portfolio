import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/portfolio";
import { ProjectVisual } from "@/components/project-grid";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.name,
        description: p.description,
        alternates: { canonical: `/work/${p.slug}` },
        openGraph: {
          title: `${p.name} — Emmanuel Eyung`,
          description: p.description,
          url: `/work/${p.slug}`,
        },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main id="main-content" className="case-study container">
      <Link className="text-link" href="/#work">
        ← All selected work
      </Link>
      <div className="case-heading">
        <p className="eyebrow">
          {p.category} / {p.status}
        </p>
        <h1>
          {p.name}
          <span>{p.subtitle}</span>
        </h1>
        <p className="lead">{p.description}</p>
        <div className="hero-actions">
          <a className="button button-dark" href={p.repo}>
            Explore the source ↗
          </a>
          {p.live && (
            <a className="text-link" href={p.live}>
              Visit the application ↗
            </a>
          )}
        </div>
      </div>
      <ProjectVisual {...p} />
      <div className="case-details">
        <aside>
          <div>
            <span className="eyebrow">MY CONTRIBUTION</span>
            <p>{p.role}</p>
          </div>
          <div>
            <span className="eyebrow">TECHNOLOGY</span>
            <div className="tags">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <Link className="text-link" href="/#contact">
            Have a similar challenge? ↗
          </Link>
        </aside>
        <div>
          <section>
            <p className="eyebrow">01 / THE PROBLEM</p>
            <h2>What needed to change.</h2>
            <p>{p.problem}</p>
          </section>
          <section>
            <p className="eyebrow">02 / THE APPROACH</p>
            <h2>The work behind the product.</h2>
            <ul>
              {p.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className="eyebrow">03 / THE OUTCOME</p>
            <h2>Where the work stands.</h2>
            <p>{p.outcome}</p>
            <div className="case-note">
              <strong>What comes next</strong>
              <p>{p.next}</p>
            </div>
          </section>
        </div>
      </div>
      <Link href={`/work/${next.slug}`} className="next-project">
        <span className="eyebrow">EXPLORE ANOTHER PROJECT</span>
        <span>{next.name} ↗</span>
      </Link>
    </main>
  );
}
