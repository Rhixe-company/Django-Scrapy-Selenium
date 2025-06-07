export interface ChapterType {
  id: string;
  name: string;
  title?: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
  comic: Comic;
}

interface Comic {
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
}

export interface ChapterImageType {
  id: string;
  link: string;
  image?: string;
  status?: string;
  checksum?: string;
  comic: number;
  chapter: number;
}
