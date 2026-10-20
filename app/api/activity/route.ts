import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/eeyung1/repos?sort=pushed&direction=desc&per_page=12",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "eeyung-portfolio",
        },
        next: { revalidate: 1800 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) throw new Error("GitHub unavailable");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid response");
    const repositories = data
      .filter(
        (r) =>
          r &&
          !r.fork &&
          !r.archived &&
          typeof r.name === "string" &&
          typeof r.html_url === "string" &&
          r.html_url.startsWith("https://github.com/eeyung1/") &&
          typeof r.pushed_at === "string" &&
          Number.isFinite(Date.parse(r.pushed_at)),
      )
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        language: typeof r.language === "string" ? r.language : null,
        updated: r.pushed_at,
        description: typeof r.description === "string" ? r.description : null,
      }));
    return NextResponse.json(
      { repositories },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Recent activity is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
