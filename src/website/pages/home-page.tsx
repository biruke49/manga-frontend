import { SiteShell } from "@/website/components/site-shell";
import { getPublicSiteContent } from "@/website/lib/public-site-content";
import { getPublicMangas } from "@/entities/manga/api/manga-repository";
import { HomeHeroSection } from "@/website/sections/home-hero-section";

export async function HomePage() {
	const { heroContent, siteConfig, mainNavigation } = await getPublicSiteContent();
	const mangas = await getPublicMangas();

	return (
		<SiteShell hideHeader>
			<HomeHeroSection
				hero={heroContent}
				mangas={mangas.slice(0, 8)}
				siteConfig={siteConfig}
				mainNavigation={mainNavigation}
			/>
		</SiteShell>
	);
}
