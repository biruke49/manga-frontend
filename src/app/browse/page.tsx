import type { Metadata } from "next";
import { BrowsePage } from "@/website/pages/browse-page";

export const metadata: Metadata = {
  title: "Browse Manga",
  description: "Browse all published manga on the platform.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <BrowsePage />;
}
