import type { Metadata } from "next";
import { Header, Footer } from "@/components/site-shell";
import { profile } from "@/lib/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  title: {
    default: "Emmanuel Eyung — Software Engineer & Product Builder",
    template: "%s | Emmanuel Eyung",
  },
  description:
    "I build web applications, reliable Go and Python backends, and AI-powered workflows. Explore my projects and work with me on your next product.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Emmanuel Eyung",
    title: "Emmanuel Eyung — Software Engineer & Product Builder",
    description:
      "Good ideas deserve to become working products. Explore my work in product engineering, APIs and AI.",
    url: profile.site,
  },
  twitter: { card: "summary_large_image", creator: "@eeyung1" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.site,
    image: `${profile.site}/eeyung.jpg`,
    jobTitle: "Software Engineer",
    sameAs: [profile.github, profile.linkedin, profile.x],
  };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
