import Link from "next/link";
import { Container } from "@/website/components/container";
import type { getPublicSiteContent } from "@/website/lib/public-site-content";

type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteContent>>["siteConfig"];
type PublicContactPoints = Awaited<ReturnType<typeof getPublicSiteContent>>["contactPoints"];
type PublicFooterNavigation = Awaited<ReturnType<typeof getPublicSiteContent>>["footerNavigation"];

export function SiteFooter({
	siteConfig,
	contactPoints,
	footerNavigation,
}: {
	siteConfig: PublicSiteConfig;
	contactPoints: PublicContactPoints;
	footerNavigation: PublicFooterNavigation;
}) {
	const email = contactPoints.find((point) => point.href?.startsWith("mailto:"));
	const phone = contactPoints.find((point) => point.href?.startsWith("tel:"));

	return (
		<footer id="contact" className="border-t border-white/10 bg-card/70 py-12 text-muted-foreground sm:py-16">
			<Container>
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<Link href="/" className="flex items-center gap-3 text-foreground">
							<span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-black uppercase tracking-[0.08em] text-accent-foreground">
								Y
							</span>
							<span className="text-xl font-black uppercase tracking-[0.02em]">
								{siteConfig.name}
							</span>
						</Link>
						<p className="mt-5 max-w-56 text-sm leading-6 text-muted-foreground/80">
							{siteConfig.description}
						</p>
					</div>

					<FooterColumn title="Manga" links={footerNavigation.services} />
					<FooterColumn title="Company" links={footerNavigation.company} />

					<div>
						<h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/70">
							Contact
						</h3>
						<div className="mt-5 space-y-3 text-sm text-muted-foreground/80">
							{email ? (
								<a href={email.href} className="block transition hover:text-foreground">
									{email.value}
								</a>
							) : null}
							{phone ? (
								<a href={phone.href} className="block transition hover:text-foreground">
									{phone.value}
								</a>
							) : null}
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-white/10 pt-7 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/50">
					<p>
						(c) {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}
					</p>
				</div>
			</Container>
		</footer>
	);
}

function FooterColumn({
	title,
	links,
}: {
	title: string;
	links: Array<{ label: string; href: string }>;
}) {
	return (
		<div>
			<h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/70">
				{title}
			</h3>
			<ul className="mt-5 space-y-3 text-sm text-muted-foreground/80">
				{links.map((item) => (
					<li key={item.label}>
						<Link href={item.href} className="transition hover:text-foreground">
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
