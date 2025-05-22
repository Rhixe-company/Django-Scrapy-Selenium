import React from "react";
import Rightbar from "@/app/components/base/Rightbar";

import { getComic } from "@/app/components/comic/ComicDetail";
import Leftbar from "@/app/components/comic/Leftbar";

export const dynamicParams = true; // default val = true

export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/comics/");

  const comics = await res.json();
  return comics.results.map((comic: any) => ({
    slug: comic.slug,
  }));
}

export default async function page({ params }: any) {
  const myparams = await params;

  const comic = await getComic(myparams.slug);

  return (
    <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
      <Leftbar comic={comic} />
      <Rightbar />
    </div>
  );
}
