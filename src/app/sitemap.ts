import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/pricing", "/about", "/signin", "/signup"]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route ? `/${route}` : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))
}

// TODO: Add dynamic routes
