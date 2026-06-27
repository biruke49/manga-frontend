import { SiteShell } from "@/website/components/site-shell";
import { MangaDetailSection } from "@/website/sections/manga/manga-detail-section";

interface MangaDetailPageProps {
  id: string;
}

export async function MangaDetailPage({ id }: MangaDetailPageProps) {
  return (
    <SiteShell>
      <MangaDetailSection id={id} />
    </SiteShell>
  );
}
