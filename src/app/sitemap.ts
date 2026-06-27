import type { MetadataRoute } from "next";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

const routes = ["", "/booking"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { siteConfig } = await getPublicSiteContent();

	return routes.map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 1,
	}));
}
