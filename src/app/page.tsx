import type { Metadata } from "next";
import { HomePage } from "@/website/pages/home-page";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

export async function generateMetadata(): Promise<Metadata> {
	const { siteConfig } = await getPublicSiteContent();

	return {
		title: "Home",
		description: siteConfig.description,
		alternates: {
			canonical: "/",
		},
		openGraph: {
			title: siteConfig.title,
			description: siteConfig.description,
			url: siteConfig.url,
			siteName: siteConfig.name,
			locale: siteConfig.locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: siteConfig.title,
			description: siteConfig.description,
		},
	};
}

export default async function Page() {
	return <HomePage />;
}
