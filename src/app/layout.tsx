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
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11"
				/>
			</head>
			<body
				className="antialiased bg-background font-sans"
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
