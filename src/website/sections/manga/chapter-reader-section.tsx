"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ReaderData } from "@/entities/manga/model/types";

interface ChapterReaderSectionProps {
  readerData: ReaderData;
  mangaId: string;
}

export function ChapterReaderSection({
  readerData,
  mangaId,
}: ChapterReaderSectionProps) {
  const { chapter, pages } = readerData;
  const [currentPage, setCurrentPage] = useState(0);
  const progress = pages.length > 0 ? ((currentPage + 1) / pages.length) * 100 : 0;

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(pages.length - 1, p + 1));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090910] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090910]/92 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/manga/${mangaId}`}
            className="shrink-0 rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Back
          </Link>
          <span className="shrink-0 text-sm font-black">
            Ch. {chapter.chapterNumber}
          </span>
          {chapter.title && (
            <>
              <span className="text-xs text-white/35">/</span>
              <span className="truncate text-xs font-medium text-white/60">{chapter.title}</span>
            </>
          )}
        </div>

        <div className="shrink-0 rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white/70">
            Page {currentPage + 1} / {pages.length}
        </div>
        </div>
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center bg-[radial-gradient(circle_at_top,_rgba(233,69,96,0.12),_transparent_36%)]">
        {pages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-white/40">
            No pages available.
          </div>
        ) : (
          <>
            <div className="relative w-full max-w-3xl">
              {pages[currentPage]?.imageUrl ? (
                <Image
                  src={pages[currentPage].imageUrl}
                  alt={`Page ${currentPage + 1}`}
                  width={pages[currentPage].width || 800}
                  height={pages[currentPage].height || 1200}
                  className="mx-auto h-auto w-full"
                  unoptimized
                  priority
                />
              ) : (
                <div className="flex h-[80vh] items-center justify-center text-white/40">
                  Loading image...
                </div>
              )}
            </div>

            {pages.length > 1 && (
              <div className="sticky bottom-0 z-50 flex w-full items-center justify-center gap-3 border-t border-white/10 bg-[#090910]/92 px-4 py-4 backdrop-blur-md sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="h-11 rounded-lg border border-white/10 bg-white/10 px-5 text-xs font-black uppercase tracking-[0.08em] transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 sm:px-7"
                >
                  Previous
                </button>
                <span className="min-w-16 text-center text-xs font-bold text-white/60">
                  {currentPage + 1} / {pages.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === pages.length - 1}
                  className="h-11 rounded-lg bg-accent px-5 text-xs font-black uppercase tracking-[0.08em] text-accent-foreground transition hover:bg-accent/88 disabled:cursor-not-allowed disabled:opacity-30 sm:px-7"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
