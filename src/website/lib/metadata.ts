import type { Metadata } from "next";
import { siteConfig } from "@/website/config/site-content";

interface MetadataInput {
	title: string;
	description: string;
	path?: string;
}

export function buildMetadata({
	title,
	description,
	path = "/",
}: MetadataInput): Metadata {
	const url = `${siteConfig.url}${path}`;

	return {
		title,
		description,
		alternates: {
			canonical: path,
		},
		openGraph: {
			title,
			description,
			url,
			siteName: siteConfig.name,
			locale: siteConfig.locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}
