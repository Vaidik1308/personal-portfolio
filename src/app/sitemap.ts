import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// One page: the sections are apps opened by URL hash, which crawlers treat as the same URL
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
