import React, { Fragment } from "react";

import fetchComics from "@/lib/comic/fetchComics";
import type { ComicsResults } from "@/models/comics";
import CustomRating from "@/app/components/base/CustomRating";
import Link from "next/link";
import Image from "next/image";
export default async function Gridbar() {
  const url = "http:localhost:8000/api/comics/";
  const comics: ComicsResults | undefined = await fetchComics(url);
  if (comics?.total_results === 0)
    return <h2 className="m-4 text-2xl font-bold">No Comics Found</h2>;
  return (
    <Fragment>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4">
        {/* <Griditem comics={comics} /> */}
        {comics?.results.map((comic) => (
          <Fragment key={comic.slug}>
            <Link href={`/comic/${comic.slug}`}>
              <div className="w-full block sm:block hover:cursor-pointer group hover:text-themecolor">
                <div>
                  <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
                    <span className={`status ${comic.status}`}>
                      {comic.status}
                    </span>

                    {comic.images[0].image ? (
                      <Image
                        src={`http://127.0.0.1:8000${comic.images[0].image}`}
                        alt={comic.title}
                        width={100}
                        height={100}
                        quality={100}
                        className="rounded-md series_grid_item_image"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={`${comic.images[0].link}`}
                        alt={comic.title}
                        width={100}
                        height={100}
                        quality={100}
                        className="rounded-md series_grid_item_image"
                        unoptimized
                      />
                    )}
                    <div
                      className={`series_grid_item_pill ${comic.category.name}`}
                    >
                      <span className="text-[10px] font-bold py-[2px] px-[7px]">
                        {comic.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="block w-[100%] h-auto items-center series_grid_item_info">
                    <span className="block text-[13.3px] font-bold">
                      {comic.title}
                    </span>
                    <span className="text-[13px] text-[#999]">
                      {comic.first_chapter?.name}
                    </span>
                    <span className="flex text-[12px] text-[#999]">
                      <CustomRating rating={Number(comic.rating)} />
                      <label className="ml-1">{comic.rating}</label>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center py-[15px] bg-[#222222]">
        <div className="flex items-center justify-center py-[15px] bg-[#222222]">
          {/* <button
              style={{ pointerEvents: "none" }}
              className="flex items-center bg-slate-500 opacity-60 text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] cursor-pointer text-center mr-1"
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
              Previous{" "}
            </button> */}
          <button
            style={{ pointerEvents: "auto" }}
            className="flex items-center bg-themecolor  text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] cursor-pointer text-center mr-1"
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
            Previous{" "}
          </button>
          <button
            style={{ pointerEvents: "auto" }}
            className="flex items-center bg-themecolor text-white px-8 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center cursor-pointer"
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
    </Fragment>
  );
}
