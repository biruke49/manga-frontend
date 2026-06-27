import type { Manga, MangaDetail, ReaderData } from "../model/types";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ||
      payload?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }
  return response.json() as Promise<T>;
}

export async function getPublicMangas(
  searchParams?: string
): Promise<Manga[]> {
  try {
    const url = `${getApiBaseUrl()}/manga/public-mangas${
      searchParams ? `?${searchParams}` : ""
    }`;
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
    const result = await parseResponse<{ data: Manga[] }>(response);
    return result.data ?? [];
  } catch {
    return [];
  }
}

export async function getPublicMangaDetail(
  id: string
): Promise<MangaDetail | null> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/manga/public-manga-detail/${id}`,
      { next: { revalidate: 60 } }
    );
    return parseResponse<MangaDetail>(response);
  } catch {
    return null;
  }
}

export async function getReaderChapter(
  chapterId: string
): Promise<ReaderData | null> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/chapters/reader/${chapterId}`,
      { next: { revalidate: 60 } }
    );
    return parseResponse<ReaderData>(response);
  } catch {
    return null;
  }
}
