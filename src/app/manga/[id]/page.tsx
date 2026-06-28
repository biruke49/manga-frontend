import type { Metadata } from "next";
import { getPublicMangaDetail } from "@/entities/manga/api/manga-repository";
import { MangaDetailPage } from "@/website/pages/manga-detail-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const manga = await getPublicMangaDetail(id);
  return {
    title: manga?.title || "Manga",
    description: manga?.description || "Read this manga on Yishak.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <MangaDetailPage id={id} />;
}
