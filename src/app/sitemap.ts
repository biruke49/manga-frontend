import type { MetadataRoute } from "next";
import { getPublicMangas } from "@/entities/manga/api/manga-repository";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

const routes = ["", "/browse", "/login"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [{ siteConfig }, mangas] = await Promise.all([
		getPublicSiteContent(),
		getPublicMangas(),
	]);

	const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 1,
	}));
	const mangaRoutes: MetadataRoute.Sitemap = mangas.map((manga) => ({
		url: `${siteConfig.url}/manga/${manga.id}`,
		lastModified: manga.updatedAt ? new Date(manga.updatedAt) : new Date(),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	return [...staticRoutes, ...mangaRoutes];
}
