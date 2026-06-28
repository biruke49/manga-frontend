import Image from "next/image";
import Link from "next/link";
import type { Manga } from "@/entities/manga/model/types";

interface MangaCardProps {
	manga: Manga;
	variant?: "default" | "compact";
}

function formatLanguage(language?: string) {
	return language ? language.toUpperCase() : "MANGA";
}

export function MangaCard({ manga, variant = "default" }: MangaCardProps) {
	const genres = manga.genres?.filter(Boolean).slice(0, variant === "compact" ? 2 : 3) ?? [];

	return (
		<Link
			href={`/manga/${manga.id}`}
			className="group flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/45"
		>
			<div className="relative aspect-[3/4] overflow-hidden bg-muted">
				{manga.coverImageUrl ? (
					<Image
						src={manga.coverImageUrl}
						alt={manga.title}
						fill
						className="object-cover transition duration-500 group-hover:scale-105"
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
						unoptimized
					/>
				) : (
					<div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,_rgba(233,86,63,0.22),_rgba(48,51,61,0.78))] px-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-foreground/60">
						No cover
					</div>
				)}
				<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/88 to-transparent" />
				<div className="absolute left-3 top-3 flex flex-wrap gap-2">
					<span className="rounded-md border border-white/15 bg-background/75 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-foreground backdrop-blur">
						{formatLanguage(manga.language)}
					</span>
					{manga.isMature ? (
						<span className="rounded-md bg-destructive px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
							18+
						</span>
					) : null}
				</div>
				{manga.chapterCount > 0 ? (
					<span className="absolute bottom-3 right-3 rounded-md bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-accent-foreground">
						{manga.chapterCount} ch.
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col gap-3 p-4">
				<div>
					<h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground">
						{manga.title}
					</h3>
					{manga.artist ? (
						<p className="mt-1 truncate text-xs text-muted-foreground">
							by {manga.artist}
						</p>
					) : null}
				</div>

				{genres.length > 0 ? (
					<div className="mt-auto flex flex-wrap gap-1.5">
						{genres.map((genre) => (
							<span
								key={genre}
								className="rounded-md bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground"
							>
								{genre}
							</span>
						))}
					</div>
				) : (
					<span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
						Start reading
					</span>
				)}
			</div>
		</Link>
	);
}
