import Image from "next/image";
import Link from "next/link";
import { Container } from "@/website/components/container";
import { MangaCard } from "@/website/components/manga-card";
import type { Manga } from "@/entities/manga/model/types";

interface HomeHeroSectionProps {
	hero: {
		eyebrow: string;
		title: string[];
		description: string;
		primaryCta: {
			label: string;
			href: string;
		};
		secondaryCta: {
			label: string;
			href: string;
		};
		announcement?: string;
		announcementSecondary?: string;
	};
	mangas?: Manga[];
}

const readerValues = [
	{
		title: "Original Ethiopian worlds",
		description: "Stories shaped by local culture, modern characters, folklore, action, romance, and drama.",
	},
	{
		title: "A shelf that stays simple",
		description: "Covers, chapters, and creators are easy to scan so readers can get into the story quickly.",
	},
	{
		title: "Ready for creators",
		description: "A focused place for artists to publish chapters and build an audience around their work.",
	},
];

const fallbackGenres = ["Action", "Romance", "Fantasy", "Drama", "Folklore", "Slice of Life"];

export function HomeHeroSection({ hero, mangas = [] }: HomeHeroSectionProps) {
	const showcaseMangas = mangas.filter((manga) => manga.coverImageUrl).slice(0, 5);
	const featuredManga = showcaseMangas[0];
	const totalChapters = mangas.reduce((total, manga) => total + manga.chapterCount, 0);
	const latestMangas = mangas.slice(0, 8);
	const genres = Array.from(new Set(mangas.flatMap((manga) => manga.genres ?? []).filter(Boolean))).slice(0, 6);
	const displayGenres = genres.length > 0 ? genres : fallbackGenres;

	return (
		<div className="overflow-hidden">
			<section className="relative border-b border-white/10">
				<div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.035),_transparent_42%)]" />
				<Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.82fr)] lg:py-16">
					<div className="max-w-3xl">
						<p className="eyebrow text-accent">
							{hero.eyebrow || "Ethiopia Manga Community"}
						</p>
						<h1 className="mt-4 text-4xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
							Read Ethiopian manga without the noise.
						</h1>
						<p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
							Yishak brings Ethiopian manga, comics, and creator-led stories into one clean reading library.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href={hero.primaryCta.href || "/browse"}
								className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-xs font-black uppercase tracking-[0.12em] text-accent-foreground transition hover:bg-accent/90"
							>
								{hero.primaryCta.label || "Browse manga"}
							</Link>
							<Link
								href="/login"
								className="inline-flex h-12 items-center justify-center rounded-md border border-white/12 bg-white/[0.03] px-7 text-xs font-black uppercase tracking-[0.12em] text-foreground transition hover:border-accent/45 hover:bg-white/[0.06]"
							>
								Publish your story
							</Link>
						</div>

						<div className="mt-9 grid max-w-xl grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-card/70">
							<Stat value={mangas.length || "New"} label="series" />
							<Stat value={totalChapters || "Fresh"} label="chapters" />
							<Stat value="ET" label="made" last />
						</div>
					</div>

					<HeroShelf featuredManga={featuredManga} showcaseMangas={showcaseMangas} />
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
						<div className="grid gap-4 md:grid-cols-3">
							{readerValues.map((item) => (
								<ValuePanel key={item.title} {...item} />
							))}
						</div>
					)}
				</Container>
			</section>

			<section className="section-space">
				<Container>
					<div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
						<div>
							<p className="eyebrow text-accent">Discover</p>
							<h2 className="mt-2 text-3xl font-black leading-tight text-foreground sm:text-4xl">
								Simple paths into new stories.
							</h2>
						</div>
						<div className="grid gap-4 md:grid-cols-3">
							{readerValues.map((item) => (
								<ValuePanel key={item.title} {...item} />
							))}
						</div>
					</div>

					<div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-8">
						{displayGenres.map((genre) => (
							<span
								key={genre}
								className="rounded-md border border-white/10 bg-card px-3 py-2 text-xs font-bold text-muted-foreground"
							>
								{genre}
							</span>
						))}
					</div>
				</Container>
			</section>
		</div>
	);
}

function HeroShelf({
	featuredManga,
	showcaseMangas,
}: {
	featuredManga?: Manga;
	showcaseMangas: Manga[];
}) {
	return (
		<div className="mx-auto w-full max-w-[540px]">
			<div className="rounded-lg border border-white/10 bg-card p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
				<div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
					{featuredManga ? (
						<Link
							href={`/manga/${featuredManga.id}`}
							className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
						>
							<Image
								src={featuredManga.coverImageUrl}
								alt={featuredManga.title}
								fill
								className="object-cover transition duration-500 group-hover:scale-105"
								sizes="(max-width: 1024px) 82vw, 300px"
								priority
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/92 to-transparent p-4 pt-20">
								<p className="line-clamp-2 text-lg font-black leading-tight text-foreground">
									{featuredManga.title}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									{featuredManga.chapterCount} chapters
								</p>
							</div>
						</Link>
					) : (
						<FauxCover title="Yishak originals" large />
					)}

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
						{showcaseMangas.slice(1, 3).map((manga) => (
							<Link
								key={manga.id}
								href={`/manga/${manga.id}`}
								className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-muted sm:aspect-[16/11]"
							>
								<Image
									src={manga.coverImageUrl}
									alt={manga.title}
									fill
									className="object-cover transition duration-500 group-hover:scale-105"
									sizes="240px"
								/>
							</Link>
						))}
						{showcaseMangas.length < 3 ? (
							<>
								<FauxCover title="Folklore" />
								<FauxCover title="New chapter" />
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

function FauxCover({ title, large = false }: { title: string; large?: boolean }) {
	return (
		<div
			className={`relative overflow-hidden rounded-lg bg-[linear-gradient(145deg,_#30333d,_#181a21_56%,_#101116)] ${
				large ? "aspect-[3/4]" : "aspect-[3/4] sm:aspect-[16/11]"
			}`}
		>
			<div className="absolute inset-4 rounded-md border border-white/10" />
			<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/92 to-transparent p-4 pt-20">
				<p className="text-sm font-black uppercase tracking-[0.1em] text-foreground">{title}</p>
				<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">Original series</p>
			</div>
		</div>
	);
}

function ValuePanel({ title, description }: { title: string; description: string }) {
	return (
		<div className="rounded-lg border border-white/10 bg-card p-5">
			<h3 className="text-lg font-black text-foreground">{title}</h3>
			<p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
		</div>
	);
}

function Stat({ value, label, last = false }: { value: string | number; label: string; last?: boolean }) {
	return (
		<div className={`p-4 ${last ? "" : "border-r border-white/10"}`}>
			<p className="text-2xl font-black text-foreground">{value}</p>
			<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
		</div>
	);
}
