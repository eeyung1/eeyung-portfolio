import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, priority: 1 },
    ...projects.map((p) => ({
      url: `${profile.site}/work/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
