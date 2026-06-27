"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/website/components/container";
import type { getPublicSiteContent } from "@/website/lib/public-site-content";

type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteContent>>["siteConfig"];
type PublicNavigation = Awaited<ReturnType<typeof getPublicSiteContent>>["mainNavigation"];

function MenuIcon({ open }: { open: boolean }) {
	return (
		<span className="relative block h-4 w-5" aria-hidden="true">
			<span
				className={`absolute left-0 top-0 h-px w-5 bg-current transition ${
					open ? "translate-y-[7px] rotate-45" : ""
				}`}
			/>
			<span
				className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${
					open ? "opacity-0" : ""
				}`}
			/>
			<span
				className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${
					open ? "-translate-y-[7px] -rotate-45" : ""
				}`}
			/>
		</span>
	);
}

function BrandMark({ name }: { name: string }) {
	const displayName = name || "YISHAK";

	return (
		<Link
			href="/"
			aria-label={`${displayName} home`}
			className="flex items-center gap-3 text-foreground"
		>
			<span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-black uppercase tracking-[0.08em] text-accent-foreground shadow-[0_10px_30px_rgba(233,86,63,0.22)]">
				Y
			</span>
			<span className="text-sm font-black uppercase tracking-[0.08em] sm:text-base">
				{displayName}
			</span>
		</Link>
	);
}

export function SiteHeader({
	siteConfig,
	mainNavigation,
}: {
	siteConfig: PublicSiteConfig;
	mainNavigation: PublicNavigation;
}) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
			<Container className="flex min-h-16 items-center justify-between gap-4 py-3">
				<BrandMark name={siteConfig.name} />

				<nav
					aria-label="Primary"
					className="hidden items-center gap-1 lg:flex"
				>
					{mainNavigation.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/browse"
						className="ml-2 rounded-md bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-accent-foreground transition hover:bg-accent/90"
					>
						Read now
					</Link>
				</nav>

				<div className="flex items-center gap-3 lg:hidden">
					<Link
						href="/browse"
						className="inline-flex h-9 items-center rounded-md bg-accent px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground transition hover:bg-accent/90"
					>
						Read
					</Link>
					<button
						type="button"
						aria-expanded={mobileMenuOpen}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
						onClick={() => setMobileMenuOpen((open) => !open)}
						className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-card text-foreground transition hover:border-accent/50"
					>
						<MenuIcon open={mobileMenuOpen} />
					</button>
				</div>
			</Container>

			{mobileMenuOpen ? (
				<div className="border-t border-white/10 bg-card shadow-[0_18px_44px_rgba(0,0,0,0.4)] lg:hidden">
					<Container className="py-4">
						<nav aria-label="Mobile primary" className="grid gap-1">
							{mainNavigation.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className="rounded-md px-3 py-3 text-sm font-bold text-foreground transition hover:bg-muted"
								>
									{item.label}
								</Link>
							))}
							<Link
								href="/browse"
								onClick={() => setMobileMenuOpen(false)}
								className="mt-3 rounded-md bg-accent px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground"
							>
								Read now
							</Link>
						</nav>
					</Container>
				</div>
			) : null}
		</header>
	);
}
