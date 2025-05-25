import React from "react";

import CarouselItems from "@/app/components/base/CarouselItems";

import Image from "next/image";
import Link from "next/link";
import fetchTopComics from "@/lib/comic/fetchTopComics";
import type { Comics } from "@/models/comics";

export default async function Carouselsbar() {
  const url = "http:localhost:8000/api/comics/top/";
  const comics: Comics | undefined = await fetchTopComics(url);
  if (!comics)
    return <h2 className="m-4 text-2xl font-bold">No Top Comics Found</h2>;
  return (
    <div className="overflow-hidden">
      <CarouselItems comics={comics} />
      <div className="overflow-hidden hidden min-[882px]:hidden min-[883px]:block">
        {comics.slice(0, 1).map((item) => (
          <div
            key={item.slug}
            className="relative cursor-pointer h-[280px] ml-2.5"
          >
            <Link href={`/comic/${item.slug}`}>
              <Image
                decoding="async"
                loading="eager"
                alt="Trending Crown"
                width={70}
                height={70}
                quality={100}
                style={{
                  color: "transparent",
                  top: "10px",
                  right: "5px",
                  position: "absolute",
                  backgroundSize: "100px",
                  zIndex: "1",
                }}
                src="/crown.webp"
              />

              <div className="absolute w-full h-full top-0 left-0 z-1 text-white myblack">
                <div className="mt-[40%] leading-[19px] text-left uppercase px-[5%] py-0">
                  <span className="block text-[16px]">
                    Rhixe Scans <b>Trending</b> This Week
                  </span>
                  <span className="block text-[17px] mt-[5px] h-[55px] overflow-hidden">
                    <b>{item.title}</b>
                  </span>
                </div>
              </div>
              <div className="h-full w-full overflow-hidden bg-[auto 100%] bg-[top center] bg-black opacity-20">
                {item.images[0].image ? (
                  <div
                    className="h-full w-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url(http://127.0.0.1:8000${item.images[0].image})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                ) : (
                  <div
                    className="h-full w-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${item.images[0].link})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
