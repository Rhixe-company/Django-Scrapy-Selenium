import { notFound } from "next/navigation";

export interface Comic {
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
  author: Category;
  artist: Category;
  genres: Genres[];
  images: ComicImage[];
  chapters: Chapter[];
  first_chapter: Chapter;
  last_chapter: Chapter;
  has_images: boolean;
  has_chapters: boolean;
}

export interface Chapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
}

interface ComicImage {
  link: string;
  image: string;
  status: string;
  checksum: string;
}

interface Genres {
  name?: any;
}

interface Category {
  name: string;
  id: number;
}

export async function getComics(page: number) {
  const res = await fetch(`http://localhost:4000/comics/?page=${page}`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}
