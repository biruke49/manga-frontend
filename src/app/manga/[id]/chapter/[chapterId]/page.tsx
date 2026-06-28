import type { Metadata } from "next";
import { getReaderChapter } from "@/entities/manga/api/manga-repository";
import { ReaderPage } from "@/website/pages/reader-page";

interface PageProps {
  params: Promise<{ id: string; chapterId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { chapterId } = await params;
  const readerData = await getReaderChapter(chapterId);
  const chapter = readerData?.chapter;
  return {
    title: chapter?.title || (chapter ? `Chapter ${chapter.chapterNumber}` : "Chapter Reader"),
    description: chapter ? `Read chapter ${chapter.chapterNumber} on Yishak.` : "Read manga on Yishak.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id, chapterId } = await params;
  return <ReaderPage mangaId={id} chapterId={chapterId} />;
}
