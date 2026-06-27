import Link from "next/link";
import { Container } from "@/website/components/container";
import { MangaCard } from "@/website/components/manga-card";
import type { Manga } from "@/entities/manga/model/types";

interface MangaGridSectionProps {
  mangas: Manga[];
  title?: string;
}

export function MangaGridSection({ mangas, title }: MangaGridSectionProps) {
  return (
    <section className="section-space border-t border-white/5">
      <Container>
        {title && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">Fresh from the library</p>
              <h2 className="mt-2 text-2xl font-black text-primary-foreground sm:text-3xl">
                {title}
              </h2>
            </div>
            <Link
              href="/browse"
              className="hidden rounded-md border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground transition hover:border-accent/50 hover:text-primary-foreground sm:inline-flex"
            >
              View all
            </Link>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} variant="compact" />
          ))}
        </div>
      </Container>
    </section>
  );
}
