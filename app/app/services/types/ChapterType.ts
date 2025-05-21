export interface ChapterType {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: Date;
  comic: Comic;
  images?: ChapterImage[];
  comments?: any[];
  has_images: boolean;
}

interface ChapterImage {
  link: string;
  image?: any;
  status?: any;
  checksum?: any;
  chapter: number;
  comic: number;
}

interface Comic {
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
}

interface Link {
  next?: string;
  previous?: string;
}

export interface ChaptersType {
  results: ChapterType[];
  links: Link;
  count: number;
  numpages: number;
}
