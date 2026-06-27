import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/website/components/container";
import { getPublicMangaDetail } from "@/entities/manga/api/manga-repository";

interface MangaDetailSectionProps {
	id: string;
}

export async function MangaDetailSection({ id }: MangaDetailSectionProps) {
	const manga = await getPublicMangaDetail(id);
	if (!manga) notFound();
	const firstChapter = manga.chapters[0];

	return (
		<section className="relative overflow-hidden pb-16">
			{manga.coverImageUrl ? (
				<div className="absolute inset-x-0 top-0 h-[380px] opacity-25 blur-3xl">
					<Image
						src={manga.coverImageUrl}
						alt=""
						fill
						className="object-cover"
						sizes="100vw"
						aria-hidden="true"
					/>
				</div>
			) : null}
			<div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background/50 via-background/92 to-background" />
			<Container>
				<div className="relative grid gap-8 pt-12 md:grid-cols-[320px_1fr] lg:gap-12">
					<div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-muted shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
						{manga.coverImageUrl ? (
							<Image
								src={manga.coverImageUrl}
								alt={manga.title}
								fill
								className="object-cover"
								sizes="300px"
							/>
						) : (
							<div className="flex h-full items-center justify-center text-muted-foreground">
								No cover
							</div>
						)}
					</div>

					<div className="flex flex-col gap-6">
						<div>
							<p className="eyebrow text-accent">Series details</p>
							<h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
								{manga.title}
							</h1>
							{manga.artist ? (
								<p className="mt-3 text-sm text-muted-foreground">
									by {manga.artist}
								</p>
							) : null}
						</div>

						<div className="flex flex-wrap gap-2">
							{manga.genres?.map((genre) => (
								<span
									key={genre}
									className="rounded-md border border-white/10 bg-card px-3 py-2 text-xs font-bold text-muted-foreground"
								>
									{genre}
								</span>
							))}
							{manga.isMature ? (
								<span className="rounded-md bg-destructive px-3 py-2 text-xs font-bold text-white">
									Mature
								</span>
							) : null}
							<span className="rounded-md border border-white/10 bg-card px-3 py-2 text-xs font-bold text-muted-foreground">
								{manga.language?.toUpperCase()}
							</span>
						</div>

						{manga.description ? (
							<p className="max-w-3xl text-base leading-8 text-foreground/78">
								{manga.description}
							</p>
						) : null}

						<div className="grid max-w-3xl grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-card">
							<DetailStat value={manga.chapters.length} label="Chapters" />
							<DetailStat value={manga.status || "Live"} label="Status" />
							<DetailStat value={manga.language?.toUpperCase() || "EN"} label="Language" last />
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							{firstChapter ? (
								<Link
									href={`/manga/${manga.id}/chapter/${firstChapter.id}`}
									className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-xs font-black uppercase tracking-[0.1em] text-accent-foreground transition hover:bg-accent/90"
								>
									Read first chapter
								</Link>
							) : null}
							<Link
								href="/browse"
								className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 px-7 text-xs font-black uppercase tracking-[0.1em] text-foreground transition hover:border-accent/50 hover:bg-white/5"
							>
								Back to browse
							</Link>
						</div>

						{manga.chapters.length > 0 ? (
							<div className="mt-2">
								<h2 className="mb-4 text-lg font-black text-foreground">
									Chapters ({manga.chapters.length})
								</h2>
								<div className="grid gap-2">
									{manga.chapters.map((chapter) => (
										<Link
											key={chapter.id}
											href={`/manga/${manga.id}/chapter/${chapter.id}`}
											className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-card px-4 py-3 transition hover:border-accent/40 hover:bg-muted"
										>
											<div className="flex items-center gap-3">
												<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-black text-foreground">
													{chapter.chapterNumber}
												</span>
												<div>
													<p className="text-sm font-bold text-foreground">
														{chapter.title || `Chapter ${chapter.chapterNumber}`}
													</p>
													<p className="text-xs text-muted-foreground">
														{chapter.pageCount} pages
													</p>
												</div>
											</div>
											<span className="hidden text-xs text-muted-foreground sm:block">
												{new Date(chapter.createdAt).toLocaleDateString()}
											</span>
										</Link>
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>
			</Container>
		</section>
	);
}

function DetailStat({
	value,
	label,
	last = false,
}: {
	value: string | number;
	label: string;
	last?: boolean;
}) {
	return (
		<div className={`p-4 ${last ? "" : "border-r border-white/10"}`}>
			<p className="truncate text-2xl font-black text-foreground">{value}</p>
			<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
		</div>
	);
}
