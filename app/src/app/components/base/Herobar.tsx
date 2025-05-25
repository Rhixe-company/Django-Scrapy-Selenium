import React from "react";

import Image from "next/image";
import Link from "next/link";

import CustomRating from "@/app/components/base/CustomRating";
import fetchFeaturedComics from "@/lib/comic/fetchTopComics";
import type { Comics } from "@/models/comics";

export default async function Herobar() {
  const url = "http:localhost:8000/api/comics/featured/";
  const comics: Comics | undefined = await fetchFeaturedComics(url);
  if (!comics)
    return <h2 className="m-4 text-2xl font-bold">No Featured Comics Found</h2>;
  return (
    <div className="text-white pt-2">
      <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
        <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
          Popular Today
        </h3>
      </div>
      <div className="flex flex-wrap bg-[#222222] p-[10px] md:hidden">
        {comics.slice(0, 4).map((item) => (
          <div
            key={item.slug}
            className="w-1/2 xs:w-1/2 sm:w-1/4 p-1.5 hover:cursor-pointer group hover:text-themecolor"
          >
            <Link href={`/comic/${item.slug}`}>
              <div>
                <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
                  {item.images[0].image ? (
                    <Image
                      src={`http://127.0.0.1:8000${item.images[0].image}`}
                      alt={item.title}
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-md series_grid_item_image"
                      unoptimized
                      decoding="async"
                      loading="eager"
                    />
                  ) : (
                    <Image
                      src={`${item.images[0].link}`}
                      alt={item.title}
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-md series_grid_item_image"
                      unoptimized
                      decoding="async"
                      loading="eager"
                    />
                  )}
                  <div className={`status ${item.status}`}>
                    <span className="text-[10px] font-bold py-[2px] px-[7px]">
                      {item.category.name}
                    </span>
                  </div>
                </div>
                <div
                  className="block w-[100%] h-auto items-center"
                  style={{
                    fontSize: "13.3px",
                    margin: "8px 0",
                    marginBottom: "5px",
                    fontWeight: "500",
                    lineHeight: "19px",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <span className="block text-[13.3px] font-bold">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-[#999]">
                    {item.last_chapter.name}
                  </span>
                  <span className="flex text-[12px] text-[#999]">
                    <CustomRating rating={Number(item.rating)} />
                    <label className="ml-1">{item.rating}</label>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex-wrap hidden md:flex bg-[#222222] p-[10px]">
        {comics.map((item) => (
          <div
            key={item.slug}
            className="w-1/2 xs:w-1/3 sm:w-1/5 p-1.5 hover:cursor-pointer group hover:text-themecolor"
          >
            <Link href={`/comic/${item.slug}`}>
              <div>
                <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
                  {item.images[0].image ? (
                    <Image
                      src={`http://127.0.0.1:8000${item.images[0].image}`}
                      alt={item.title}
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-md series_grid_item_image"
                      unoptimized
                      decoding="async"
                      loading="eager"
                    />
                  ) : (
                    <Image
                      src={`${item.images[0].link}`}
                      alt={item.title}
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-md series_grid_item_image"
                      unoptimized
                      decoding="async"
                      loading="eager"
                    />
                  )}
                  <div className={`status ${item.status}`}>
                    <span className="text-[10px] font-bold py-[2px] px-[7px]">
                      {item.category.name}
                    </span>
                  </div>
                </div>
                <div
                  className="block w-[100%] h-auto items-center"
                  style={{
                    fontSize: "13.3px",
                    margin: "8px 0",
                    marginBottom: "5px",
                    fontWeight: "500",
                    lineHeight: "19px",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <span className="block text-[13.3px] font-bold">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-[#999]">
                    {item.last_chapter.name}
                  </span>
                  <span className="flex text-[12px] text-[#999]">
                    <CustomRating rating={Number(item.rating)} />
                    <label className="ml-1">{item.rating}</label>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
