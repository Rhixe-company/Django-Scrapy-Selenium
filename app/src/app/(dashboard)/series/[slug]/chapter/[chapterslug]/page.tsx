import Navbar from "@/app/components/base/Navbar";
import Scrollbar from "@/app/components/base/Scrollbar";
import Footerbar from "@/app/components/base/Footerbar";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import fetchChapter from "@/lib/fetchChapter";
import type { Chapter } from "@/models/chapters";

export const dynamicParams = true; // default val = true

export default async function Home(props: {
  params: Promise<{ chapterslug: string }>;
}) {
  const params = await props.params;
  const url = `http:localhost:8000/api/chapters/${params.chapterslug}/`;
  const chapter: Chapter | undefined = await fetchChapter(url);
  if (!chapter)
    return (
      <h2 className="m-4 text-2xl font-bold">
        Chapter {params.chapterslug} not Found
      </h2>
    );
  return (
    <Fragment>
      <Navbar />
      <div className="max-w-[1220px] pt-2 overflow-hidden  m-auto pb-[9rem]">
        <div className="w-[100%]">
          <div className="max-w-[1220px]  overflow-hidden  m-auto relative">
            <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
              <div className="flex flex-col items-center space-y-2 pt-6 px-5 text-center">
                <h2 className="text-xl text-[#DDDDDD] font-bold">
                  {chapter.comic.title} {chapter.name}
                  {chapter.title && <>{chapter.title}</>}
                </h2>
                <p className="text-sm text-[#999999]">
                  All chapters are in
                  <Link href={`/series/${chapter.comic.slug}`}>
                    <span className="text-[#913FE2] font-bold hover:text-[#999999] cursor-pointer pl-1">
                      {chapter.comic.title}
                    </span>
                  </Link>
                </p>
                <div className="flex items-center justify-center gap-1 py-2">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=/series/${chapter.comic.slug}/chapter/${chapter.slug}&amp;t=${chapter.comic.title}`}
                    target="_blank"
                    className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-[#2f477b] hover:bg-[#2a4170] rounded-sm text-white w-[5rem] h-[22px]"
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/facebook.svg"
                      alt="Facebook"
                      className="w-[12px] h-[13px] mt-[1px]"
                    />
                    Facebook
                  </Link>
                  <Link
                    href={`https://www.twitter.com/intent/tweet?url=/series/${chapter.comic.slug}/chapter/${chapter.slug}&amp;text=${chapter.comic.title}`}
                    target="_blank"
                    className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-[#1781c3] hover:bg-[#3d7fa8] rounded-sm text-white w-[5rem] h-[22px]"
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/twitter.svg"
                      alt="Twitter"
                      className="w-[13px] h-[13px] mr-[2px] mt-[1px]"
                    />
                    Twitter
                  </Link>
                  <Link
                    href={`whatsapp://send/?text=${chapter.comic.title}%20/series/${chapter.comic.slug}/chapter/${chapter.slug}`}
                    target="_blank"
                    className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-green-500 hover:bg-green-600 rounded-sm text-white w-[5rem] h-[22px]"
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/whatsapp.svg"
                      alt="WhatsApp"
                      className="w-[10.5px] h-[13px] pt-[1.5px]"
                    />
                    WhatsApp
                  </Link>
                  <Link
                    href={`https://pinterest.com/pin/create/button/?url=/series/${chapter.comic.slug}/chapter/${chapter.slug}&amp;media=${chapter.comic.images[0].link}&amp;description=${chapter.comic.title}`}
                    target="_blank"
                    className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-red-500 hover:bg-red-600 rounded-sm text-white w-[5rem] h-[22px]"
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/pinterest.svg"
                      alt="Pinterest"
                      className="w-[10px] h-[15px] pt-[1px]"
                    />
                    Pinterest
                  </Link>
                </div>
                <div className="bg-[#222222] px-5 py-2.5 flex items-center flex-wrap justify-center gap-x-2 w-full">
                  <Link href="/series" className="flex items-center gap-x-1">
                    <h3 className="hover:text-themecolor text-[#999999] cursor-pointer text-sm">
                      Rhixe Scans
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right w-3.5 h-3.5 text-[#999999]"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </Link>
                  <Link
                    href={`/series/${chapter.comic.slug}`}
                    className="flex items-center gap-x-1"
                  >
                    <h3 className="hover:text-themecolor text-[#999999] cursor-pointer text-sm">
                      {chapter.comic.title}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right w-3.5 h-3.5 text-[#999999]"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </Link>
                  <Link href={`/series/${chapter.comic.slug}`}>
                    <h3 className="hover:text-themecolor text-[#999999] cursor-pointer text-sm">
                      {chapter.comic.title} {chapter.name}
                      {chapter.title && <>{chapter.title}</>}
                    </h3>
                  </Link>
                </div>
                <h2 className="text-center md:text-center py-4 text-sm text-[#999999]">
                  Read the latest manga
                  <span className="font-bold px-1">
                    {chapter.comic.title} {chapter.name}
                  </span>
                  at <span className="font-bold">Rhixe Scans </span>. Manga
                  <span className="font-bold pl-1">{chapter.comic.title}</span>
                  is always updated at{" "}
                  <span className="font-bold">Rhixe Scans</span>. Dont forget to
                  read the other manga updates. A list of manga collections
                  <span className="font-bold pl-1">Rhixe Scans</span> is in the
                  Manga List menu.
                </h2>
                <div className="flex flex-row flex-wrap gap-y-2 justify-between items-center md:justify-between w-full">
                  <div className="flex flex-wrap gap-2 xs:flex-nowrap w-full max-w-[600px]">
                    <div className="relative flex w-full sm:max-w-60">
                      <button className="px-3 py-2 dropdown-btn">
                        <h2 className="text-[#9B9B9B] text-[13px] text-start sm:whitespace-nowrap truncate">
                          {chapter.name} {chapter.title && <>{chapter.title}</>}
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down text-[#9B9B9B] w-4"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="w-full relative sm:max-w-60">
                      <button className="p-3 dropdown-btn flex justify-between items-center w-full">
                        <span className="text-[#9B9B9B] text-[13px]">
                          Default Quality
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down text-[#9B9B9B] w-4"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 px-4 py-2 h-[36px] rounded-[62px] bg-[#222222] text-[#9B9B9B] text-[13px] font-normal">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_305_437)">
                          <path
                            d="M20.484 8.51074L23.495 4.51474C24.069 3.75274 24.161 2.74874 23.735 1.89574C23.309 1.04174 22.452 0.510742 21.498 0.510742H4.5C2.019 0.510742 0 2.52974 0 5.01074V23.0107C0.034 24.9827 2.967 24.9817 3 23.0107V16.5107H21.498C22.452 16.5107 23.31 15.9807 23.735 15.1257C24.161 14.2717 24.069 13.2687 23.495 12.5067L20.484 8.51074ZM3 13.5107V5.01074C3 4.18374 3.673 3.51074 4.5 3.51074H20.495L17.408 7.60874C17.006 8.14274 17.006 8.87974 17.408 9.41374L20.495 13.5117H3V13.5107Z"
                            fill="#9B9B9B"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_305_437">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 0.510742)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="ml-2">Report</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-x-3 flex-row w-full sm:w-40 justify-between sm:self-end">
                    <Link
                      href={`/series/${chapter.comic.slug}/chapter/${chapter.slug}`}
                    >
                      <div className="flex items-center justify-center bg-themecolor pl-3 pr-4 py-2 rounded-full cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-left text-white w-4 h-4"
                        >
                          <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <h2 className="text-white text-sm">Prev</h2>
                      </div>
                    </Link>
                    <div className="flex items-center justify-center bg-[#222222] pl-4 pr-3 py-2 rounded-full cursor-not-allowed">
                      <h2 className="text-[#555555] text-sm">Next</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right text-[#555555] w-4 h-4"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="py-8 -mx-5 md:mx-0 flex flex-col items-center justify-center">
                  <div className="w-full relative sm:max-w-60"></div>
                  {chapter.images.map(
                    (myimg, index: React.Key | null | undefined) => (
                      <div key={index}>
                        <div className="w-full mx-auto center">
                          {myimg.image ? (
                            <Image
                              height={500}
                              width={500}
                              src={`http://127.0.0.1:8000${myimg.image}`}
                              className="object-cover mx-auto"
                              alt={`chapter page ${index}`}
                              decoding="async"
                              fetchPriority="high"
                              loading="eager"
                            />
                          ) : (
                            <Image
                              height={500}
                              width={500}
                              src={myimg.link}
                              className="object-cover mx-auto"
                              alt={`chapter page ${index}`}
                              decoding="async"
                              fetchPriority="high"
                              loading="eager"
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex md:flex-row gap-y-2 justify-between items-center md:justify-between w-full flex-wrap">
                  <div className="flex gap-2.5 w-full xs:max-w-60">
                    <div className="relative flex w-full sm:max-w-60">
                      <button className="px-3 py-2 dropdown-btn">
                        <h2 className="text-[#9B9B9B] text-[13px] text-start sm:whitespace-nowrap truncate">
                          {chapter.name} {chapter.title && <>{chapter.title}</>}
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down text-[#9B9B9B] w-4"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-3 flex-row w-full xs:w-40 justify-between xs:self-end">
                    <Link
                      href={`/series/${chapter.comic.slug}/chapter/${chapter.slug}`}
                    >
                      <div className="flex items-center justify-center bg-themecolor pl-3 pr-4 py-1.5 rounded-full cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-left text-white w-4 h-4"
                        >
                          <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <h2 className="text-white text-sm">Prev</h2>
                      </div>
                    </Link>
                    <div className="flex items-center justify-center bg-[#222222] pl-4 pr-3 py-1.5 rounded-full cursor-not-allowed">
                      <h2 className="text-[#555555] text-sm">Next</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right text-[#555555] w-4 h-4"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#222222] px-5 py-4 flex items-center md:text-start justify-center gap-x-2 w-full">
                    <h2 className="text-[13px] text-[#999999]">
                      tags: read manga {chapter.comic.title} {chapter.name},
                      comic
                      {chapter.comic.title}
                      {chapter.name}, read{chapter.comic.title} {chapter.name}{" "}
                      online,
                      {chapter.comic.title}
                      <span className="px-1">{chapter.name}</span>
                      chapter, {chapter.comic.title} {chapter.name}chapter,
                      {chapter.comic.title} {chapter.name}
                      high quality, {chapter.comic.title} {chapter.name} manga
                      scan,
                      {chapter.updated_at},
                    </h2>
                  </div>
                  <div className="bg-[#222222]">
                    <div className="py-2 px-5 border-b-[1px] border-b-[#A2A2A2]/20">
                      <h3 className="text-white font-semibold text-base text-start">
                        Related Series
                      </h3>
                    </div>
                    <div className="grid md:hidden grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-5 xl:grid-cols-7 gap-3 bg-[#222222] p-4">
                      <Link href="/series/solo-max-level-newbie-76d38a6a">
                        <div className="h-full flex flex-col rounded-sm pr-1 hover:opacity-60 hover:cursor-pointer hover:text-themecolor">
                          <div className="w-full h-64 sm:h-48 relative overflow-hidden">
                            <span className="status bg-blue-700">Ongoing</span>
                            <Image
                              alt=""
                              loading="lazy"
                              width={100}
                              height={100}
                              decoding="async"
                              data-nimg="1"
                              className="rounded-md object-cover h-[270px] md:h-[200px]"
                              style={{ color: "transparent", width: "100%" }}
                              src="/01JMHFP0DBPD906JMCZNAKG1RH-optimized.webp"
                            />
                          </div>
                          <h2 className="text-[13px] text-[#DDDDDD] text-left pt-4 font-bold">
                            Solo Max-Level Newbie
                          </h2>
                          <h2 className="text-[13px] text-[#DDDDDD] text-left pt-">
                            Chapter <span>197</span>
                          </h2>
                          <div
                            className="block w-[100%] h-auto items-center"
                            style={{
                              fontSize: "13.3px",
                              margin: "2px 0",
                              marginBottom: "5px",
                              fontWeight: "500",
                              lineHeight: "19px",
                              textAlign: "left",
                              overflow: "hidden",
                            }}
                          >
                            <span className="flex text-[12px] text-[#999]">
                              <div
                                className="rr--group rr--dir-x rr--space-sm myrr"
                                role="img"
                                aria-label="Rated 4.95 on 5"
                              >
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 0 0"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g shapeRendering="geometricPrecision">
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 0 0"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g shapeRendering="geometricPrecision">
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 0 0"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g shapeRendering="geometricPrecision">
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 0 0"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g shapeRendering="geometricPrecision">
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 0 0"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g shapeRendering="geometricPrecision">
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              <label className="ml-1">9.9</label>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 gap-3 bg-[#222222] p-4">
                      <Link href="/series/solo-max-level-newbie-76d38a6a">
                        <div className="h-full flex flex-col rounded-sm pr-1 hover:opacity-60 hover:cursor-pointer hover:text-themecolor">
                          <div className="w-full h-64 sm:h-48 relative overflow-hidden">
                            <span className="status bg-blue-700">Ongoing</span>
                            <Image
                              alt=""
                              loading="lazy"
                              width={100}
                              height={100}
                              decoding="async"
                              data-nimg="1"
                              className="rounded-md object-cover h-[270px] md:h-[200px]"
                              style={{ color: "transparent", width: "100%" }}
                              src="/01JMHFP0DBPD906JMCZNAKG1RH-optimized.webp"
                            />
                          </div>
                          <h2 className="text-[13px] text-[#DDDDDD] text-left pt-4 font-bold">
                            Solo Max-Level Newbie
                          </h2>
                          <h2 className="text-[13px] text-[#DDDDDD] text-left pt-">
                            Chapter <span>197</span>
                          </h2>
                          <div
                            className="block w-[100%] h-auto items-center"
                            style={{
                              fontSize: "13.3px",
                              margin: "2px 0",
                              marginBottom: "5px",
                              fontWeight: "500",
                              lineHeight: "19px",
                              textAlign: "left",
                              overflow: "hidden",
                            }}
                          >
                            <span className="flex text-[12px] text-[#999]">
                              <div
                                className="rr--group rr--dir-x rr--space-sm myrr"
                                role="img"
                                aria-label="Rated 4.95 on 5"
                              >
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24.99 24.1"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g
                                      shapeRendering="geometricPrecision"
                                      transform="translate(-87.55 -48.8)"
                                    >
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24.99 24.1"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g
                                      shapeRendering="geometricPrecision"
                                      transform="translate(-87.55 -48.8)"
                                    >
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24.99 24.1"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g
                                      shapeRendering="geometricPrecision"
                                      transform="translate(-87.55 -48.8)"
                                    >
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24.99 24.1"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g
                                      shapeRendering="geometricPrecision"
                                      transform="translate(-87.55 -48.8)"
                                    >
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="rr--box rr--on">
                                  <svg
                                    aria-hidden="true"
                                    className="rr--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24.99 24.1"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <g
                                      shapeRendering="geometricPrecision"
                                      transform="translate(-87.55 -48.8)"
                                    >
                                      <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              <label className="ml-1">9.9</label>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-[#222222]">
                    <div className="py-2 px-5 border-b-[1px] border-b-[#A2A2A2]/20">
                      <h3 className="text-white font-semibold text-left text-base">
                        Comments
                      </h3>
                    </div>
                    <div className="p-4 space-y-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scrollbar />
      <Footerbar />
    </Fragment>
  );
}

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  // Fetch or define your chapters (e.g., from an API or database)
  const res = await fetch("http://localhost:8000/api/chapters/");
  const chapters = await res.json();
  return chapters.results.map((chapter: Chapter) => ({
    chapterslug: chapter.slug,
  }));
}
