"use client";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/portfolio";
export function ProjectVisual({
  slug,
  mark,
  accent,
}: {
  slug: string;
  mark: string;
  accent: string;
}) {
  return (
    <div className={`project-art ${accent}`} aria-hidden="true">
      <div className="art-grid" />
      <span className="art-label">
        {slug === "listenledger"
          ? "CONVERSATION → RECORD"
          : slug === "l2estudylink"
            ? "PLAN. LEARN. REFLECT."
            : slug === "multi-agent-orchestrator"
              ? "PLAN → DELEGATE → VALIDATE"
              : "BUILT WITH INTENTION"}
      </span>
      <span className="art-mark">
        {mark}
        <span>✳</span>
      </span>
      <div className="art-bottom">
        <span>{slug.replaceAll("-", " / ")}</span>
        <span>↗</span>
      </div>
      {slug === "listenledger" && (
        <div className="waveform">
          {Array.from({ length: 25 }, (_, i) => (
            <i key={i} style={{ height: `${12 + ((i * 17) % 49)}px` }} />
          ))}
        </div>
      )}
    </div>
  );
}
export function ProjectGrid() {
  const [filter, setFilter] = useState("All work");
  const selected = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <>
      <div className="filters" aria-label="Filter projects">
        {[
          "All work",
          "Product engineering",
          "AI & automation",
          "APIs & integrations",
        ].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "All work" && (
              <span>{projects.length.toString().padStart(2, "0")}</span>
            )}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {selected.length} projects shown
      </p>
      <div className="project-grid">
        {selected.map((p) => (
          <article key={p.slug} className="project-card">
            <Link
              href={`/work/${p.slug}`}
              className="project-cover"
              aria-label={`Read ${p.name} case study`}
            >
              <ProjectVisual {...p} />
              <span className="cover-action">Explore project ↗</span>
            </Link>
            <div className="project-meta">
              <span>{p.category}</span>
              <span>{p.status}</span>
            </div>
            <Link className="project-title" href={`/work/${p.slug}`}>
              <h3>{p.name}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
            <p>{p.description}</p>
            <div className="tags">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
