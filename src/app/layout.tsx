import type { Metadata } from "next";
import "./globals.css";
import { getThemeStyleVariables } from "@/website/config/theme";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

export async function generateMetadata(): Promise<Metadata> {
	const { siteConfig: publicSiteConfig } = await getPublicSiteContent();

	return {
		title: {
			default: publicSiteConfig.title,
			template: `%s | ${publicSiteConfig.name}`,
		},
		description: publicSiteConfig.description,
		metadataBase: new URL(publicSiteConfig.url),
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon.ico",
		},
		openGraph: {
			title: publicSiteConfig.title,
			description: publicSiteConfig.description,
			url: publicSiteConfig.url,
			siteName: publicSiteConfig.name,
			locale: publicSiteConfig.locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: publicSiteConfig.title,
			description: publicSiteConfig.description,
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			style={getThemeStyleVariables()}
		>
			<body
				className="antialiased bg-background font-sans"
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
