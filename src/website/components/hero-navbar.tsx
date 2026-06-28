"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/website/components/container";
import type { getPublicSiteContent } from "@/website/lib/public-site-content";

type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteContent>>["siteConfig"];
type PublicNavigation = Awaited<ReturnType<typeof getPublicSiteContent>>["mainNavigation"];

export function HeroNavbar({
	siteConfig,
	mainNavigation,
}: {
	siteConfig: PublicSiteConfig;
	mainNavigation: PublicNavigation;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<header
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
					scrolled ? "border-b border-white/10 bg-background/90 backdrop-blur-xl" : "bg-transparent"
				}`}
			>
				<Container className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
					<Link
						href="/"
						className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl"
					>
						{siteConfig.name}
					</Link>

					<nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
						{mainNavigation.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="font-inter text-sm uppercase tracking-widest text-white/80 transition hover:text-white"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<Link
						href="/browse"
						className="hidden items-center gap-2 border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 md:flex"
					>
						Read now
						<ArrowUpRight className="h-3.5 w-3.5" />
					</Link>

					<button
						type="button"
						aria-expanded={menuOpen}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						onClick={() => setMenuOpen(true)}
						className="flex flex-col gap-1.5 md:hidden"
					>
						<span className="h-0.5 w-6 bg-white" />
						<span className="h-0.5 w-6 bg-white" />
						<span className="h-0.5 w-4 bg-white" />
					</button>
				</Container>
			</header>

			<div
				className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
					menuOpen ? "visible opacity-100" : "invisible opacity-0"
				}`}
			>
				<Container className="flex items-center justify-between px-6 py-5">
					<span className="font-podium text-2xl font-bold uppercase tracking-wider text-white">
						{siteConfig.name}
					</span>
					<button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-white">
						<X className="h-7 w-7" />
					</button>
				</Container>

				<div className="flex h-[calc(100%-88px)] flex-col items-center justify-center gap-6">
					{mainNavigation.map((item, i) => (
						<Link
							key={item.label}
							href={item.href}
							onClick={() => setMenuOpen(false)}
							className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl"
							style={{
								transitionDelay: `${i * 80 + 100}ms`,
								opacity: menuOpen ? 1 : 0,
								transform: menuOpen ? "translateY(0)" : "translateY(20px)",
							}}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/browse"
						onClick={() => setMenuOpen(false)}
						className="mt-4 flex items-center gap-2 border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/10"
						style={{
							transitionDelay: `${mainNavigation.length * 80 + 100}ms`,
							opacity: menuOpen ? 1 : 0,
							transform: menuOpen ? "translateY(0)" : "translateY(20px)",
						}}
					>
						Read now
						<ArrowUpRight className="h-3.5 w-3.5" />
					</Link>
				</div>
			</div>
		</>
	);
}
