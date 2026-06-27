import type { Metadata } from "next";
import { MangaDetailPage } from "@/website/pages/manga-detail-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Manga Detail`,
    description: `View manga details.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <MangaDetailPage id={id} />;
}
