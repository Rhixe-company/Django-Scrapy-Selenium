export interface Comics {
  next?: any;
  previous: number;
  page: number;
  total_results: number;
  total_pages: number;
  results: Comic[];
}
export interface Comic {
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
  user: User;
  category: Category;
  website: Category;
  has_images: boolean;
  has_chapters: boolean;
  author: Category;
  artist: Category;
  genres: Category[];
  images: Image[];
  chapters: Chapter[];
  comments: any[];
  users: any[];
  related_series: ChapterComic[];
  first_chapter: Chapter;
  last_chapter: Chapter;
}

interface Chapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
  comic: ChapterComic;
}

interface Image {
  id: string;
  link: string;
  image: string;
  status: string;
  checksum: string;
  comic: ChapterComic;
}

interface ChapterComic {
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

interface Category {
  name: string;
  id: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image?: any;
  is_admin: boolean;
}
