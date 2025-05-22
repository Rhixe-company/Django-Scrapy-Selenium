import { notFound } from "next/navigation";

export interface Chapter {
  name: string;
  title: string;
  slug: string;
  link: string;
  numimages: number;
  updated_at: string;
  comic: Comic;
  images: ChapterImage[];
  comments: any[];
  has_images: boolean;
}

export interface ChapterImage {
  link: string;
  image?: any;
  status?: any;
  checksum?: any;
  chapter: number;
  comic: number;
}

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
}
export async function getChapter(slug: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/chapters/${slug}/`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}
