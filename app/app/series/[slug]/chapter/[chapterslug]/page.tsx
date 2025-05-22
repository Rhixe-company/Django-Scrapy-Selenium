import React from "react";

import { getChapter } from "@/app/components/chapter/ChapterDetail";
import Mainbar from "@/app/components/chapter/Mainbar";

export const dynamicParams = true; // default val = true

export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/chapters/");
  const chapters = await res.json();
  return chapters.results.map((chapter: any) => ({
    chapterslug: chapter.slug,
  }));
}

export default async function page({ params }: any) {
  const myparams = await params;

  const chapter = await getChapter(myparams.chapterslug);

  return (
    <div>
      <Mainbar chapter={chapter} />
    </div>
  );
}
