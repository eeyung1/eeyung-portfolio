import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="container empty-page">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>A small detour.</h1>
      <p>
        This page is not part of the portfolio. Let’s get you back to the work.
      </p>
      <Link href="/#work" className="button button-dark">
        Explore the projects ↗
      </Link>
    </main>
  );
}
