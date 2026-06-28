import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/website/components/container";
import { HeroNavbar } from "@/website/components/hero-navbar";
import { MangaCard } from "@/website/components/manga-card";
import type { Manga } from "@/entities/manga/model/types";
import type { getPublicSiteContent } from "@/website/lib/public-site-content";

type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteContent>>["siteConfig"];
type PublicNavigation = Awaited<ReturnType<typeof getPublicSiteContent>>["mainNavigation"];
type PublicHeroContent = Awaited<ReturnType<typeof getPublicSiteContent>>["heroContent"];

const HERO_VIDEO_URL =
	"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

interface HomeHeroSectionProps {
	hero: PublicHeroContent;
	mangas?: Manga[];
	siteConfig: PublicSiteConfig;
	mainNavigation: PublicNavigation;
}

export function HomeHeroSection({ hero, mangas = [], siteConfig, mainNavigation }: HomeHeroSectionProps) {
	const featuredManga = mangas.find((manga) => manga.coverImageUrl);
	const totalChapters = mangas.reduce((total, manga) => total + manga.chapterCount, 0);
	const latestMangas = mangas.slice(0, 8);

	return (
		<div className="overflow-hidden">
			<HeroNavbar siteConfig={siteConfig} mainNavigation={mainNavigation} />

			<section className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/10">
				<video
					className="absolute inset-0 h-full w-full object-cover"
					autoPlay
					muted
					loop
					playsInline
					src={HERO_VIDEO_URL}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-background" />

				<Container className="relative z-10 py-32 lg:py-36">
					<div className="max-w-3xl">
						<p className="animate-fade-up mb-6 flex items-center gap-2 font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm lg:mb-8">
							<BookOpen className="h-4 w-4 text-white/70" />
							{hero.eyebrow || "Ethiopia Manga Community"}
						</p>

						<h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-normal text-white">
							<span className="block text-[clamp(2.8rem,8vw,7rem)]">Read.</span>
							<span className="block text-[clamp(2.8rem,8vw,7rem)]">Create.</span>
							<span className="block text-[clamp(2.8rem,8vw,7rem)]">Share.</span>
						</h1>

						<p className="animate-fade-up-delay-2 mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
							Yishak brings Ethiopian manga, comics, and creator-led stories into one clean reading library.
						</p>

						<div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
							<Link
								href={hero.primaryCta.href || "/browse"}
								className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-[11px] font-black uppercase tracking-widest text-accent-foreground transition hover:bg-accent/90 sm:px-7 sm:py-4 sm:text-xs"
							>
								{hero.primaryCta.label || "Browse manga"}
								<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>

							<Link
								href="/login"
								className="inline-flex items-center border border-white/30 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-xs"
							>
								Publish your story
							</Link>

							{featuredManga ? (
								<Link href={`/manga/${featuredManga.id}`} className="hidden items-center gap-3 sm:flex">
									<span className="relative h-12 w-9 shrink-0 overflow-hidden rounded-sm bg-white/10">
										<Image
											src={featuredManga.coverImageUrl}
											alt={featuredManga.title}
											fill
											className="object-cover"
											sizes="36px"
											unoptimized
										/>
									</span>
									<span className="text-xs uppercase tracking-wider text-white/60">
										<span className="block text-white/40">Featured series</span>
										<span className="line-clamp-1">{featuredManga.title}</span>
									</span>
								</Link>
							) : null}
						</div>

						{mangas.length > 0 ? (
							<div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16">
								<Stat value={mangas.length} label="series" />
								<Stat value={totalChapters} label="chapters" />
							</div>
						) : null}
					</div>
				</Container>
			</section>

			<section id="library" className="section-space border-b border-white/10">
				<Container>
					<div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<p className="eyebrow text-accent">Library</p>
							<h2 className="mt-2 text-3xl font-black leading-tight text-foreground sm:text-4xl">
								Latest series
							</h2>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
								Start with the newest covers, then jump into the detail page or first chapter.
							</p>
						</div>
						<Link
							href="/browse"
							className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-5 text-xs font-black uppercase tracking-[0.1em] text-foreground transition hover:border-accent/45 hover:bg-white/[0.04]"
						>
							View all
						</Link>
					</div>

					{latestMangas.length > 0 ? (
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{latestMangas.map((manga) => (
								<MangaCard key={manga.id} manga={manga} variant="compact" />
							))}
						</div>
					) : (
						<p className="text-sm text-muted-foreground">No published series yet.</p>
					)}
				</Container>
			</section>
		</div>
	);
}

function Stat({ value, label }: { value: string | number; label: string }) {
	return (
		<div>
			<p className="font-inter text-2xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl">
				{value}
			</p>
			<p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/50 sm:text-xs">{label}</p>
		</div>
	);
}
