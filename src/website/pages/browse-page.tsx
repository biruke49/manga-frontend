import { SiteShell } from "@/website/components/site-shell";
import { BrowseSection } from "@/website/sections/manga/browse-section";
import { getPublicMangas } from "@/entities/manga/api/manga-repository";

export async function BrowsePage() {
  const mangas = await getPublicMangas();

  return (
    <SiteShell>
      <BrowseSection mangas={mangas} />
    </SiteShell>
  );
}
