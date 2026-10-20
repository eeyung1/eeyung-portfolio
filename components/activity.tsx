"use client";
import { useEffect, useState } from "react";
type Repo = {
  name: string;
  url: string;
  language: string | null;
  updated: string;
  description: string | null;
};
export function Activity() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/activity", { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error("Unavailable");
        return r.json();
      })
      .then((data) => {
        setRepos(data.repositories);
        setStatus("ready");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);
  return (
    <div className="activity">
      <div className="activity-heading">
        <span className="eyebrow">FROM THE WORKBENCH</span>
        <a href="https://github.com/eeyung1?tab=repositories">
          Explore GitHub ↗
        </a>
      </div>
      <h3>Always building. Always learning.</h3>
      <p>Recently pushed public repositories, refreshed from GitHub.</p>
      <div aria-live="polite">
        {status === "loading" ? (
          <p className="activity-notice">Fetching recent work…</p>
        ) : status === "error" ? (
          <p className="activity-notice">
            Recent activity is temporarily unavailable. You can still explore my
            projects on GitHub.
          </p>
        ) : repos.length === 0 ? (
          <p className="activity-notice">
            No recent repositories to display. Explore my selected work above.
          </p>
        ) : (
          <div className="activity-list">
            {repos.map((r) => (
              <a key={r.url} href={r.url}>
                <span>
                  <strong>{r.name.replaceAll("-", " ")}</strong>
                  <small>{r.language || "Repository"}</small>
                </span>
                <span className="activity-date">
                  {new Date(r.updated).toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}{" "}
                  ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
