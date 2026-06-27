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
		title: "Read Ethiopian stories",
		description: "A focused manga home for culture, character, drama, action, romance, and creator-led worlds.",
	},
	{
		title: "Discover new creators",
		description: "Find fresh chapters and series from artists building the next wave of Ethiopian comics.",
	},
	{
		title: "Built for immersion",
		description: "A clean reading flow, bold cover art, and a library experience that keeps the story first.",
	},
];

const genrePills = ["Action", "Romance", "Fantasy", "Drama", "Slice of Life", "Folklore"];
const panelTitles = ["Legend", "Origin", "Pulse", "Signal"];

export function HomeHeroSection({ hero, mangas = [] }: HomeHeroSectionProps) {
	const showcaseMangas = mangas.filter((manga) => manga.coverImageUrl).slice(0, 4);
	const featuredManga = showcaseMangas[0];
	const totalChapters = mangas.reduce((total, manga) => total + manga.chapterCount, 0);
	const latestMangas = mangas.slice(0, 4);

	return (
		<div className="overflow-hidden bg-background text-primary-foreground">
			<section className="relative min-h-[calc(100svh-4rem)]">
				<div className="absolute inset-0 bg-[linear-gradient(135deg,_#080810_0%,_#12111d_42%,_#17121b_72%,_#090910_100%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,_rgba(255,184,107,0.13),_transparent_32%),radial-gradient(circle_at_80%_18%,_rgba(233,69,96,0.11),_transparent_28%),radial-gradient(circle_at_68%_78%,_rgba(69,117,233,0.1),_transparent_36%)]" />
				<div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.9)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[size:72px_72px]" />
				<div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-background" />
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

				<Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-12 pb-14 pt-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(380px,0.82fr)] lg:pb-16 lg:pt-10">
					<div className="max-w-3xl">
						<p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
							{hero.eyebrow || "Ethiopia Manga Community"}
						</p>
						<h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-primary-foreground sm:text-6xl lg:text-7xl">
							Read manga shaped by Ethiopian imagination.
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/72 sm:text-lg">
							Yishak is a premium home for Ethiopian manga readers and creators - browse original series, follow fresh chapters, and enter stories with culture at the center.
						</p>

						<div className="mt-9 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/browse"
								className="inline-flex h-14 items-center justify-center rounded-lg bg-accent px-8 text-xs font-black uppercase tracking-[0.12em] text-accent-foreground shadow-[0_18px_45px_rgba(233,69,96,0.28)] transition hover:bg-accent/88"
							>
								Browse manga
							</Link>
							<Link
								href="/login"
								className="inline-flex h-14 items-center justify-center rounded-lg border border-white/12 bg-white/5 px-8 text-xs font-black uppercase tracking-[0.12em] text-primary-foreground transition hover:border-accent/45 hover:bg-white/10"
							>
								Publish your story
							</Link>
						</div>

						<div className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur">
							<Stat value={mangas.length || "New"} label="series" />
							<Stat value={totalChapters || "Fresh"} label="chapters" />
							<Stat value="ET" label="culture" last />
						</div>

						<div className="mt-8 flex flex-wrap gap-2">
							{genrePills.map((genre) => (
								<span
									key={genre}
									className="rounded-md border border-white/10 bg-card/60 px-3 py-2 text-xs font-bold text-muted-foreground"
								>
									{genre}
								</span>
							))}
						</div>
					</div>

					<HeroShowcase featuredManga={featuredManga} showcaseMangas={showcaseMangas} />
				</Container>
			</section>

			<section id="library" className="relative border-y border-white/10 bg-[linear-gradient(180deg,_rgba(21,21,34,0.52),_rgba(9,9,16,0.86))] py-16 sm:py-20">
				<Container>
					<div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
						<div>
							<p className="eyebrow text-accent">The library</p>
							<h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-5xl">
								Designed for covers, chapters, and quiet reading.
							</h2>
							<p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
								The first page should feel like opening a curated shelf, not scrolling through a random feed. Yishak keeps the path simple: discover a story, open the detail, start reading.
							</p>
						</div>
						{latestMangas.length > 0 ? (
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
								{latestMangas.map((manga) => (
									<MangaCard key={manga.id} manga={manga} variant="compact" />
								))}
							</div>
						) : (
							<div className="grid gap-4 sm:grid-cols-3">
								{readerValues.map((item) => (
									<div key={item.title} className="rounded-lg border border-white/10 bg-background/55 p-5">
										<h3 className="text-lg font-black">{item.title}</h3>
										<p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</Container>
			</section>

			<section className="relative py-16 sm:py-20">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(233,69,96,0.1),_transparent_34%)]" />
				<Container>
					<div className="relative grid gap-4 md:grid-cols-3">
						{readerValues.map((item) => (
							<div key={item.title} className="rounded-lg border border-white/10 bg-card/65 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
								<h3 className="text-xl font-black">{item.title}</h3>
								<p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
							</div>
						))}
					</div>

					<div className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,_rgba(255,184,107,0.13),_rgba(233,69,96,0.13)_38%,_rgba(21,21,34,0.92))] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-12">
						<div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,_transparent_0_34%,_white_34%_36%,_transparent_36%_64%,_white_64%_66%,_transparent_66%)] bg-[size:84px_84px]" />
						<p className="eyebrow text-accent">Start reading</p>
						<h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
							Enter the Yishak manga library.
						</h2>
						<p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-primary-foreground/72 sm:text-base">
							One premium destination for Ethiopian manga, built to make covers shine and chapters easy to reach.
						</p>
						<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
							<Link
								href="/browse"
								className="inline-flex h-14 items-center justify-center rounded-lg bg-accent px-8 text-xs font-black uppercase tracking-[0.12em] text-accent-foreground transition hover:bg-accent/88"
							>
								Browse manga
							</Link>
							<Link
								href="/login"
								className="inline-flex h-14 items-center justify-center rounded-lg border border-white/12 px-8 text-xs font-black uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-white/10"
							>
								Creator login
							</Link>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}

function HeroShowcase({
	featuredManga,
	showcaseMangas,
}: {
	featuredManga?: Manga;
	showcaseMangas: Manga[];
}) {
	return (
		<div className="relative mx-auto w-full max-w-[560px]">
			<div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle,_rgba(233,69,96,0.22),_transparent_64%)] blur-2xl" />
			<div className="absolute -left-8 top-10 hidden h-[86%] w-24 -rotate-6 rounded-lg border border-white/10 bg-white/[0.03] lg:block" />
			<div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#10101b]/88 p-4 shadow-[0_34px_100px_rgba(0,0,0,0.55)] backdrop-blur">
				<div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.9)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[size:34px_34px]" />
				<div className="relative grid gap-4 sm:grid-cols-[0.9fr_1fr]">
					{featuredManga ? (
						<Link
							href={`/manga/${featuredManga.id}`}
							className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-muted shadow-[0_22px_60px_rgba(0,0,0,0.4)]"
						>
							<Image
								src={featuredManga.coverImageUrl}
								alt={featuredManga.title}
								fill
								className="object-cover transition duration-500 group-hover:scale-105"
								sizes="(max-width: 1024px) 80vw, 250px"
								priority
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-20">
								<p className="line-clamp-2 text-lg font-black leading-tight">{featuredManga.title}</p>
							</div>
						</Link>
					) : (
						<FauxCover title="Yishak originals" index={0} large />
					)}

					<div className="grid gap-4">
						<div className="rounded-lg border border-white/10 bg-background/70 p-5">
							<p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
								Reader preview
							</p>
							<h2 className="mt-3 text-2xl font-black leading-tight">
								A manga shelf that feels alive before the first upload.
							</h2>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Panel-inspired surfaces, bold contrast, and calm reader-first spacing give the brand a real visual world.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{showcaseMangas.slice(1, 3).map((manga) => (
								<Link
									key={manga.id}
									href={`/manga/${manga.id}`}
									className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-muted"
								>
									<Image
										src={manga.coverImageUrl}
										alt={manga.title}
										fill
										className="object-cover transition duration-500 group-hover:scale-105"
										sizes="150px"
									/>
								</Link>
							))}
							{showcaseMangas.length < 3
								? panelTitles.slice(1, 3).map((title, index) => (
										<FauxCover key={title} title={title} index={index + 1} />
									))
								: null}
						</div>
					</div>
				</div>

				<div className="relative mt-4 grid grid-cols-4 gap-3">
					{panelTitles.map((title, index) => (
						<div
							key={title}
							className="h-20 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.01))]"
						>
							<div className={`h-full ${panelGradient(index)} opacity-80`} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function FauxCover({ title, index, large = false }: { title: string; index: number; large?: boolean }) {
	return (
		<div className={`relative overflow-hidden rounded-lg border border-white/10 bg-muted ${large ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
			<div className={`absolute inset-0 ${panelGradient(index)}`} />
			<div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_0_42%,_rgba(255,255,255,0.25)_42%_44%,_transparent_44%_100%)]" />
			<div className="absolute left-4 top-4 h-16 w-16 rounded-full border border-white/20" />
			<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-20">
				<p className="text-sm font-black uppercase tracking-[0.12em] text-primary-foreground">{title}</p>
				<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">Original series</p>
			</div>
		</div>
	);
}

function panelGradient(index: number) {
	const gradients = [
		"bg-[radial-gradient(circle_at_30%_18%,_rgba(255,184,107,0.5),_transparent_24%),linear-gradient(145deg,_#2d1520,_#121225_58%,_#07070e)]",
		"bg-[radial-gradient(circle_at_70%_18%,_rgba(233,69,96,0.55),_transparent_26%),linear-gradient(145deg,_#1d1a2f,_#091421_62%,_#07070e)]",
		"bg-[radial-gradient(circle_at_35%_70%,_rgba(69,117,233,0.45),_transparent_28%),linear-gradient(145deg,_#111827,_#281626_62%,_#07070e)]",
		"bg-[radial-gradient(circle_at_66%_45%,_rgba(255,255,255,0.22),_transparent_22%),linear-gradient(145deg,_#182030,_#151522_62%,_#07070e)]",
	];

	return gradients[index % gradients.length];
}

function Stat({ value, label, last = false }: { value: string | number; label: string; last?: boolean }) {
	return (
		<div className={`p-4 ${last ? "" : "border-r border-white/10"}`}>
			<p className="text-2xl font-black text-primary-foreground">{value}</p>
			<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
		</div>
	);
}
