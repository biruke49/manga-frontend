import { Container } from "@/website/components/container";
import { MangaCard } from "@/website/components/manga-card";
import type { Manga } from "@/entities/manga/model/types";

interface BrowseSectionProps {
  mangas: Manga[];
}

export function BrowseSection({ mangas }: BrowseSectionProps) {
  const genres = Array.from(
    new Set(mangas.flatMap((manga) => manga.genres ?? []).filter(Boolean))
  ).slice(0, 8);

  return (
    <section className="section-space relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,_rgba(233,86,63,0.09),_transparent)]" />
      <Container>
        <div className="relative mb-10 grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-accent">Manga library</p>
            <h1 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Browse Manga
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover {mangas.length} published {mangas.length === 1 ? "title" : "titles"} from Ethiopian creators, with fresh chapters and genre-led stories ready to read.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:flex md:text-left">
            <div className="rounded-lg border border-white/10 bg-card p-4">
              <p className="text-2xl font-black text-foreground">{mangas.length}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Titles</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-card p-4">
              <p className="text-2xl font-black text-foreground">
                {mangas.reduce((total, manga) => total + manga.chapterCount, 0)}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Chapters</p>
            </div>
          </div>
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-2 md:col-span-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-white/10 bg-card px-3 py-2 text-xs font-bold text-muted-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {mangas.length === 0 ? (
          <div className="relative flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-white/15 bg-card/50">
            <p className="text-muted-foreground">No manga found.</p>
          </div>
        ) : (
          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {mangas.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
