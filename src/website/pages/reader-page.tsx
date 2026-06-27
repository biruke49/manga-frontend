import { getReaderChapter } from "@/entities/manga/api/manga-repository";
import { ChapterReaderSection } from "@/website/sections/manga/chapter-reader-section";
import { notFound } from "next/navigation";

interface ReaderPageProps {
  mangaId: string;
  chapterId: string;
}

export async function ReaderPage({ mangaId, chapterId }: ReaderPageProps) {
  const readerData = await getReaderChapter(chapterId);
  if (!readerData) notFound();

  return (
    <ChapterReaderSection readerData={readerData} mangaId={mangaId} />
  );
}
