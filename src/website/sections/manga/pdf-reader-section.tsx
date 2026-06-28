import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PdfReaderSectionProps {
	mangaId: string;
	title: string;
	pdfUrl: string;
}

export function PdfReaderSection({ mangaId, title, pdfUrl }: PdfReaderSectionProps) {
	const viewerUrl = `${pdfUrl}#page=1&view=FitH&pagemode=none&toolbar=0&navpanes=0&scrollbar=0`;

	return (
		<main className="flex min-h-screen flex-col bg-[#202124] text-white">
			<header className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 bg-background px-4 py-3 sm:px-6">
				<div className="flex min-w-0 items-center gap-3">
					<Link
						href={`/manga/${mangaId}`}
						aria-label="Back to manga details"
						className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
					>
						<ArrowLeft className="h-4 w-4" />
					</Link>
					<div className="min-w-0">
						<p className="truncate text-sm font-black sm:text-base">{title}</p>
						<p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">PDF edition</p>
					</div>
				</div>
				<a
					href={viewerUrl}
					target="_blank"
					rel="noreferrer"
					className="inline-flex h-9 shrink-0 items-center gap-2 px-2 text-xs font-bold text-white/60 transition hover:text-white"
				>
					Open
					<ExternalLink className="h-3.5 w-3.5" />
				</a>
			</header>
			<iframe
				title={`${title} PDF`}
				src={viewerUrl}
				loading="eager"
				className="min-h-[560px] flex-1 border-0 bg-[#202124]"
			/>
		</main>
	);
}
