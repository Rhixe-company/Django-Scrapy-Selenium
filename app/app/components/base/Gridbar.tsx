import React from "react";

import Link from "next/link";

import Image from "next/image";
import { getComics, Comic, Chapter } from "@/app/components/comic/ComicList";
export default async function Gridbar() {
  const comics = await getComics(1);
  return (
    <div className="text-white mb-1 md:mb-5 mt-5">
      <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
        <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
          Latest Updates
        </h3>
        <Link
          href="/series"
          className="text-[8.5px] rounded-[3px] bg-themecolor p-1 text-white uppercase hover:cursor-pointer"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 bg-[#222222] p-3 pb-0">
        {comics.results.map((item: Comic) => (
          <div
            className="w-full p-1 pt-1 pb-3 border-b-[1px] border-b-[#312f40]"
            key={item.slug}
          >
            <div className="grid grid-rows-1 grid-cols-12 m-2">
              <div className="col-span-3">
                <div className="w-[100%] h-32 relative">
                  <Link href={`/series/${item.slug}`}>
                    {item.images[0].image ? (
                      <Image
                        decoding="async"
                        loading="eager"
                        src={`http://127.0.0.1:8000${item.images[0].image}`}
                        alt={item.title}
                        width={100}
                        height={100}
                        data-nimg="1"
                        className="rounded-md object-cover"
                        style={{
                          color: "transparent",
                          width: "100px",
                          maxHeight: "130px",
                          objectFit: "cover",
                          objectPosition: "100% 25%,",
                        }}
                      />
                    ) : (
                      <Image
                        src={`${item.images[0].link}`}
                        alt={item.title}
                        width={100}
                        height={100}
                        decoding="async"
                        data-nimg="1"
                        className="rounded-md object-cover"
                        style={{
                          color: "transparent",
                          width: "100px",
                          maxHeight: "130px",
                          objectFit: "cover",
                          objectPosition: "100% 25%,",
                        }}
                      />
                    )}
                  </Link>
                </div>
              </div>
              <div className="col-span-9 space-y-1.5 overflow-hidden pl-[9px]">
                <span className="text-[15px] font-medium hover:text-themecolor hover:cursor-pointer">
                  <Link href={`/series/${item.slug}`}>{item.title}</Link>
                </span>
                <div className="flex flex-col gap-y-1.5 list-disc">
                  {item.chapters?.map((chapteritem: Chapter) => (
                    <span
                      key={chapteritem.slug}
                      className="flex-1 inline-block mt-1"
                    >
                      <div className="flex flex-row justify-between rounded-sm">
                        <div className="flex text-sm text-[#999] font-medium hover:text-white">
                          <Link
                            href={`/series/${item.slug}/chapter/${chapteritem.slug}`}
                            className=""
                          >
                            <span className="flex">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-[#9d4942] mt-[2px]"
                              >
                                <path
                                  d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <div className="flex gap-1">
                                <p className="w-[80px]">{chapteritem.name}</p>
                              </div>
                            </span>
                          </Link>
                        </div>
                        <p className="flex items-end ml-2 text-[12px] text-[#555555]">
                          {chapteritem.updated_at}
                        </p>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-[15px] bg-[#222222]">
        <button
          className="flex items-center bg-slate-500 opacity-60 text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center cursor-pointer mr-1"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
          Previous
        </button>

        <button
          className="flex items-center bg-themecolor text-white px-8 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center"
          style={{ pointerEvents: "auto" }}
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
