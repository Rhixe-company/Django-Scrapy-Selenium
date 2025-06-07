export interface ComicType {
  id: string;
  title: string;
  slug: string;
  description: string;
  rating: string;
  numchapters: number;
  numimages: number;
  updated_at: string;
  serialization: string;
  status: string;
  link: string;
  category: Category;
  author?: Category;
  artist?: Category;
  genres?: Genres[];
}

interface Genres {
  name: string;
}

interface Category {
  name: string;
  id: string;
}

export interface ComicImageType {
  id: string;
  link: string;
  image?: string;
  status?: string;
  checksum?: string;
  comic: number;
}
