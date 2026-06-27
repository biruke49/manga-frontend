import { Container } from "@/website/components/container";
import type { getPublicSiteContent } from "@/website/lib/public-site-content";

type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteContent>>["siteConfig"];

export function ComingSoonPage({ siteConfig }: { siteConfig: PublicSiteConfig }) {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#1c1b1b] text-white">
			<div className="absolute inset-0">
				<div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14)_0%,_transparent_58%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(28,27,27,0.96)_0%,_rgba(28,27,27,0.82)_50%,_rgba(28,27,27,0.42)_100%)]" />
			</div>

			<Container className="relative z-10 flex min-h-screen items-center py-12">
				<div className="max-w-2xl">
					<p className="text-2xl font-semibold uppercase tracking-[0.02em] text-white">
						{siteConfig.name}
					</p>
					<p className="mt-10 text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
						Coming Soon
					</p>
					<h1 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">
						The Yishak manga library is getting ready.
					</h1>
					<p className="mt-7 max-w-xl text-base leading-8 text-white/76 sm:text-lg">
						The full website is being prepared for launch. For creator access, reading updates, or community questions, contact the team directly.
					</p>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<a
							href={siteConfig.phoneHref}
							className="inline-flex h-12 items-center justify-center bg-secondary px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-secondary/90"
						>
							Call {siteConfig.phoneDisplay}
						</a>
						<a
							href={`mailto:${siteConfig.email}`}
							className="inline-flex h-12 items-center justify-center border border-white/25 bg-white/10 px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-primary"
						>
							Email Support
						</a>
					</div>
					<div className="mt-12 grid gap-4 text-sm leading-7 text-white/68 sm:grid-cols-2">
						<p>{siteConfig.address}</p>
						<p>{siteConfig.tagline}</p>
					</div>
				</div>
			</Container>
		</main>
	);
}
