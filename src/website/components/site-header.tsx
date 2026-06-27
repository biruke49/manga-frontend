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
			className="flex items-center gap-2 text-primary-foreground"
		>
			<span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-black uppercase tracking-[0.08em] text-accent-foreground">
				Y
			</span>
			<span className="text-sm font-black uppercase tracking-[0.04em] sm:text-base">
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
		<header className="sticky top-0 z-50 border-b border-white/10 bg-background/88 backdrop-blur-md">
			<Container className="flex min-h-16 items-center justify-between gap-4 py-3">
				<BrandMark name={siteConfig.name} />

				<nav
					aria-label="Primary"
					className="hidden items-center gap-1 rounded-lg border border-white/10 bg-card/55 p-1 shadow-[0_12px_30px_rgba(0,0,0,0.16)] lg:flex"
				>
					{mainNavigation.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground transition hover:bg-muted hover:text-primary-foreground"
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/browse"
						className="ml-2 rounded-md bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-accent-foreground transition hover:bg-accent/88"
					>
						Read now
					</Link>
				</nav>

				<div className="flex items-center gap-3 lg:hidden">
					<Link
						href="/browse"
						className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground transition hover:bg-accent/88"
					>
						Read
					</Link>
					<button
						type="button"
						aria-expanded={mobileMenuOpen}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
						onClick={() => setMobileMenuOpen((open) => !open)}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-card text-primary-foreground transition hover:border-accent/50"
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
									className="rounded-md px-3 py-3 text-sm font-bold text-primary-foreground transition hover:bg-muted"
								>
									{item.label}
								</Link>
							))}
							<Link
								href="/browse"
								onClick={() => setMobileMenuOpen(false)}
								className="mt-3 rounded-lg bg-accent px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground"
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
