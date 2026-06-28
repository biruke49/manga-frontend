import type { Metadata } from "next";
import { getPublicMangaDetail } from "@/entities/manga/api/manga-repository";
import { PdfReaderPage } from "@/website/pages/pdf-reader-page";

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const manga = await getPublicMangaDetail(id);

	return {
		title: manga ? `Read ${manga.title}` : "Read manga",
		description: manga ? `Read ${manga.title} on Yishak.` : "Read manga on Yishak.",
	};
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <PdfReaderPage id={id} />;
}
