import type { Metadata } from "next";
import { ReaderPage } from "@/website/pages/reader-page";

interface PageProps {
  params: Promise<{ id: string; chapterId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { chapterId } = await params;
  return {
    title: `Chapter Reader`,
    description: `Reading chapter.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, chapterId } = await params;
  return <ReaderPage mangaId={id} chapterId={chapterId} />;
}
