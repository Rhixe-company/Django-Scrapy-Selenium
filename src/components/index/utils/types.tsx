export default interface ComicModal {
  comic_id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  rating: string;
  serialization: string;
  spider: string;
  link: string;
  updated_at: string;
  has_images: boolean;
  has_chapters: boolean;
  numimages: number;
  numchapters: number;
  category: CategoryModal;
  author: AuthorModal;
  artist: ArtistModal;
  genres: GenreModal[];
  comicimages: ComicimageModal[];
  comicchapters: ChapterModal[];
}

export interface GenreModal {
  id: number;
  name: string;
}
export interface CategoryModal {
  id: number;
  name: string;
}
export interface AuthorModal {
  id: number;
  name: string;
}
export interface ArtistModal {
  id: number;
  name: string;
}

export interface ChapterimageModal {
  chapter_image_id: string;
  link: string;
  image: string;
  status: string;
  comic_id: string;
  chapter_id: string;
}

export interface ComicimageModal {
  comic_image_id: string;
  link: string;
  image: string;
  status: string;
  comic_id: string;
}

export interface ChapterModal {
  comic_id: string;
  comic_title: string;
  chapter_id: string;
  name: string;
  slug: string;
  title: string;
  spider: string;
  link: string;
  updated_at: string;
  created_at: string;
  has_images: boolean;
  numimages: number;
  chapterimages: ChapterimageModal[];
}
