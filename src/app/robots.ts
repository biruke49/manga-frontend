import type { MetadataRoute } from "next";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const { siteConfig } = await getPublicSiteContent();

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${siteConfig.url}/sitemap.xml`,
	};
}
