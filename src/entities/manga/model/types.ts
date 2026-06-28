export interface Manga {
  id: string;
  title: string;
  description: string;
  coverImageFilename: string;
  coverImageUrl: string;
	pdfFilename: string;
	pdfUrl: string;
  status: string;
  authorId: string;
  artist: string;
  genres: string[];
  tags: string[];
  language: string;
  isMature: boolean;
  rejectionReason: string;
  chapterCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  mangaId: string;
  title: string;
  chapterNumber: number;
  status: string;
  pageCount: number;
  authorId: string;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface MangaDetail extends Manga {
  chapters: Chapter[];
}

export interface Page {
  id: string;
  chapterId: string;
  pageNumber: number;
  imageFilename: string;
  imageUrl: string;
  width: number;
  height: number;
  createdAt: string;
}

export interface ReaderData {
  chapter: Chapter;
  pages: Page[];
}
