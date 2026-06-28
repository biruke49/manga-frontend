import { notFound } from "next/navigation";
import { getPublicMangaDetail } from "@/entities/manga/api/manga-repository";
import { PdfReaderSection } from "@/website/sections/manga/pdf-reader-section";

interface PdfReaderPageProps {
	id: string;
}

export async function PdfReaderPage({ id }: PdfReaderPageProps) {
	const manga = await getPublicMangaDetail(id);
	if (!manga?.pdfUrl) notFound();

	return <PdfReaderSection mangaId={manga.id} title={manga.title} pdfUrl={manga.pdfUrl} />;
}
