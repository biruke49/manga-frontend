import type { ReactNode } from "react";
import { ComingSoonPage } from "@/website/components/coming-soon-page";
import { SiteFooter } from "@/website/components/site-footer";
import { SiteHeader } from "@/website/components/site-header";
import { getPublicSiteContent } from "@/website/lib/public-site-content";

interface SiteShellProps {
	children: ReactNode;
}

export async function SiteShell({ children }: SiteShellProps) {
	const { siteConfig, contactPoints, footerNavigation, isBeingMaintained, mainNavigation } = await getPublicSiteContent();
	const showComingSoon = process.env.NODE_ENV === "production" && isBeingMaintained;

	if (showComingSoon) {
		return <ComingSoonPage siteConfig={siteConfig} />;
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			{isBeingMaintained && (
				<div className="border-b border-secondary/25 bg-secondary px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white">
					Maintenance mode is active. Availability and response windows may shift while updates are in progress.
				</div>
			)}
			<SiteHeader siteConfig={siteConfig} mainNavigation={mainNavigation} />
			<main>{children}</main>
			<SiteFooter siteConfig={siteConfig} contactPoints={contactPoints} footerNavigation={footerNavigation} />
		</div>
	);
}
