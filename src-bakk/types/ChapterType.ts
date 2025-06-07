export interface Chapters {
  next_page?: any;
  previous_page?: any;
  total_results: number;
  total_pages: number;
  results: Chapter[];
}


export interface Chapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
  comic: Comic;
  images: Image2[];
  related_series: Relatedsery[];
  comments: any[];
  has_images: boolean;
}

interface Relatedsery {
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
  images: Image[];
  first_chapter: Firstchapter2;
  last_chapter: Firstchapter2;
}

interface Firstchapter2 {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages?: number;
  updated_at?: string;
}

interface Image2 {
  link: string;
  image: string;
  status: string;
  checksum: string;
  chapter: string;
  comic: string;
}

interface Comic {
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
  images: Image[];
  first_chapter: Firstchapter;
  last_chapter: Firstchapter;
}

interface Firstchapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
}

interface Image {
  link: string;
  image: string;
  status: string;
  checksum: string;
  comic: string;
}
