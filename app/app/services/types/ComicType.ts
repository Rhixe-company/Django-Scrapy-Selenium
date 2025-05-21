export interface ComicType {
  title: string;
  slug: string;
  description: string;
  rating: string;
  numchapters: number;
  numimages: number;
  updated_at: Date;
  serialization: string;
  status: string;
  link: string;
  category: Category;
  author?: Category;
  artist?: Category;
  genres?: Genres;
  images: ComicImage[];
  chapters?: ComicChapter[];
  comments?: any[];
  users?: any[];
  first_chapter?: ComicChapter;
  last_chapter?: ComicChapter;
  has_images: boolean;
  has_chapters: boolean;
}

interface ComicChapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
}

interface ComicImage {
  link: string;
  image?: string;
  status?: string;
  checksum?: string;
}

interface Genres {
  name?: any;
}

interface Category {
  name: string;
  id: number;
}
