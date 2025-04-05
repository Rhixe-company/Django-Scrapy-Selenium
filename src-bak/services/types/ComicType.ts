export interface ComicType {
  comic_id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  rating: string;
  serialization: string;
  spider: string;
  link: string;
  updated_at: Date;
  has_images: boolean;
  has_chapters: boolean;
  numimages: number;
  numchapters: number;
  category: CategoryType;
  author: AuthorType;
  artist: ArtistType;
  genres: GenreType[];
  comicimages: ComicimageType[];
  comicchapters: ChapterType[];
}
interface GenreType {
    id: number;
    name?: string;
  }
  interface CategoryType {
    id: number;
    name?: string;
  }
  interface AuthorType {
    id: number;
    name?: string;
  }
  interface ArtistType {
    id: number;
    name?: string;
  }
  interface ComicimageType {
    comic_image_id: string;
    link: string;
    image: string;
    status: string;
    comic_id: string;

  }

  interface ChapterType {
    comic_id: string;
    comic_title: string;
    chapter_id: string;
    name?: string;
    slug: string;
    title: string;
    spider: string;
    link: string;
    updated_at: Date;
    created_at: string;
    has_images: boolean;
    numimages: number;
    chapterimages: ChapterimageType[];

  }

 interface ChapterimageType {
    chapter_image_id: string;
    link: string;
    image: string;
    status: string;
    comic_id: string;
    chapter_id: string;

  }
