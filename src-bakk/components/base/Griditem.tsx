/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comic } from "../../types/ComicType";

import Image from "next/image";
import Link from "next/link";
export default function Griditem({ item }: { item: Comic }) {
  return (
    <div className="w-full p-1 pt-1 pb-3 border-b-[1px] border-b-[#312f40]">
      <div className="grid grid-rows-1 grid-cols-12 m-2">
        <div className="col-span-3">
          <div className="w-[100%] h-32 relative">
            <Link href={`/series/${item.slug}`}>
              {item.images.length >= 2 ? (
                <Image
                  unoptimized
                  src={`http://localhost:8000${item.images[0].image}`}
                  alt={item.title}
                  loading="lazy"
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
              ) : (
                <Image
                  src={`http://localhost:8000${item.images[0].image}`}
                  alt={item.title}
                  loading="lazy"
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
            {item.chapters?.slice(0, 3).map((chapteritem: any) => (
              <span key={chapteritem.slug} className="flex-1 inline-block mt-1">
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
  );
}
