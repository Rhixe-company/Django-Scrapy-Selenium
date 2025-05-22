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
  genres: Genre[];
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

export interface Genre {
  name: string;
  id: number;
}

interface Category {
  name: string;
  id: number;
}

export async function getComic(slug: string) {
  const res = await fetch(`http://localhost:4000/comics/${slug}/`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}
