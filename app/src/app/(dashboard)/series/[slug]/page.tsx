import Navbar from "@/app/components/base/Navbar";
import Scrollbar from "@/app/components/base/Scrollbar";
import Footerbar from "@/app/components/base/Footerbar";
import Rightbar from "@/app/components/base/Rightbar";
import Image from "next/image";
import Link from "next/link";
import fetchComic from "@/lib/comic/fetchComic";
import type { Comic } from "@/models/comics";
import { Fragment } from "react";

export const dynamicParams = true; // default val = true

export default async function Home(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const url = `http:localhost:8000/api/comics/${params.slug}/`;
  const comic: Comic | undefined = await fetchComic(url);
  if (!comic)
    return (
      <h2 className="m-4 text-2xl font-bold">Comic {params.slug} not Found</h2>
    );
  return (
    <Fragment>
      <Navbar />
      <div className="max-w-[1220px] pt-2 overflow-hidden  m-auto pb-[9rem]">
        <div className="w-[100%]">
          <div className="max-w-[1220px]  overflow-hidden  m-auto relative">
            <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
              <div className="w-[100%] float-left min-[882px]:w-[68.5%] min-[1030px]:w-[70%] max-[600px]:w-[100%] relative z-0">
                <div className="space-y-6 mt-5 sm:mt-0">
                  <div className="space-y-7">
                    <div className="space-y-4">
                      <div className="bg-[#222222] px-5 py-2.5 flex items-center gap-x-2">
                        <Link href="/" className="shrink-0">
                          <h3 className="hover:text-themecolor text-white cursor-pointer text-sm">
                            Rhixe Scans
                          </h3>
                        </Link>
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
                          className="lucide lucide-chevron-right w-3.5 h-3.5 shrink-0"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                        <h3 className="hover:text-themecolor cursor-pointer text-white text-sm shrink-0 w-[calc(100%-120px)] truncate">
                          {comic.title}
                        </h3>
                      </div>
                      <div className="bg-[#222222]">
                        {comic.images?.length > 1 && (
                          <div className="bigcover">
                            {comic.images[1].image ? (
                              <Image
                                decoding="async"
                                loading="eager"
                                src={`http://127.0.0.1:8000${comic.images[1].image}`}
                                alt="series-banner-{comic.title}"
                                width={500}
                                height={500}
                                className="ime"
                                style={{
                                  color: "transparent",
                                  height: "310px",
                                }}
                              />
                            ) : (
                              <Image
                                decoding="async"
                                loading="eager"
                                src={`${comic.images[1].link}`}
                                alt="series-banner-{comic.title}"
                                width={500}
                                height={500}
                                className="ime"
                                style={{
                                  color: "transparent",
                                  height: "310px",
                                }}
                              />
                            )}
                          </div>
                        )}

                        <div
                          className={
                            comic.images?.length > 1
                              ? `relative z-10 grid grid-cols-12 gap-4 pt-4 pl-4 pr-4 pb-12 -mt-10`
                              : `relative z-10 grid grid-cols-12 gap-4 pt-4 pl-4 pr-4 pb-12`
                          }
                        >
                          <div className="relative col-span-12 sm:col-span-3 space-y-3 px-6 sm:px-0">
                            {comic.images[0].image ? (
                              <Image
                                decoding="async"
                                loading="eager"
                                src={`http://127.0.0.1:8000${comic.images[0].image}`}
                                alt="poster"
                                width={200}
                                height={350}
                                className="rounded mx-auto md:mx-0"
                                style={{ color: "transparent" }}
                              />
                            ) : (
                              <Image
                                decoding="async"
                                loading="eager"
                                src={`${comic.images[0].link}`}
                                alt="poster"
                                width={200}
                                height={350}
                                className="rounded mx-auto md:mx-0"
                                style={{ color: "transparent" }}
                              />
                            )}
                            <div className="space-y-1.5">
                              <div>
                                <button data-state="closed" className="w-full">
                                  <div className="whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 bg-themecolor text-white w-full flex items-center justify-center rounded-md py-2 hover:cursor-pointer hover:border-gray-100 hover:border-[0.5px] hover:bg-[#222222] transition-all duration-500 text-[13px]">
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
                                      className="lucide lucide-bookmark w-5 h-5"
                                    >
                                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                                    </svg>
                                    Bookmark
                                  </div>
                                </button>
                              </div>
                              <p className="text-[#A2A2A2] text-[13px] text-center">
                                Followed by 16759 people
                              </p>
                              <div className="bg-[#343434] px-2 py-1 flex items-center justify-between rounded-[3px] h-10 sm:hidden">
                                <div className="flex items-center justify-between gap-[4.96px] rating-svg rating-star-svg">
                                  <div
                                    className="rr--group rr--dir-x rr--space-sm newrr"
                                    role="img"
                                    aria-label={`Rated ${Number(comic.rating) / 2} on ${Number(comic.rating) / 2}`}
                                  >
                                    <div
                                      className={
                                        Number(comic.rating) >= 5.6
                                          ? `rr--box rr--on`
                                          : `rr--box rr--off`
                                      }
                                    >
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
                                    <div
                                      className={
                                        Number(comic.rating) >= 6.6
                                          ? `rr--box rr--on`
                                          : `rr--box rr--off`
                                      }
                                    >
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
                                    <div
                                      className={
                                        Number(comic.rating) >= 7.6
                                          ? `rr--box rr--on`
                                          : `rr--box rr--off`
                                      }
                                    >
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
                                    <div
                                      className={
                                        Number(comic.rating) >= 8.6
                                          ? `rr--box rr--on`
                                          : `rr--box rr--off`
                                      }
                                    >
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
                                    <div
                                      className={
                                        Number(comic.rating) >= 9.6
                                          ? `rr--box rr--on`
                                          : `rr--box rr--off`
                                      }
                                    >
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
                                  <p className="text-[12.82px] font-bold text-[#9c9c9c] leading-[17.95px] mt-[3px]">
                                    {Number(comic.rating)}
                                  </p>
                                </div>
                                <div>
                                  <button className="text-[13px] w-[75px] h-[24.57px] font-semibold flex items-center justify-center px-2 py-1 bg-themecolor rounded-sm text-white hover:bg-[#913ff5] cursor-pointer disabled:cursor-not-allowed">
                                    Rate
                                  </button>
                                </div>
                              </div>
                              <div className="bg-[#343434] cursor-pointer px-2 py-1 items-center justify-between rounded-[3px] h-10 sm:flex hidden rating-star rating-star-svg">
                                <div
                                  className="rr--group rr--dir-x rr--space-sm newrr"
                                  role="img"
                                  aria-label={`Rated ${Number(comic.rating) / 2} on ${Number(comic.rating) / 2}`}
                                >
                                  <div
                                    className={
                                      Number(comic.rating) >= 5.6
                                        ? `rr--box rr--on`
                                        : `rr--box rr--off`
                                    }
                                  >
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
                                  <div
                                    className={
                                      Number(comic.rating) >= 6.6
                                        ? `rr--box rr--on`
                                        : `rr--box rr--off`
                                    }
                                  >
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
                                  <div
                                    className={
                                      Number(comic.rating) >= 7.6
                                        ? `rr--box rr--on`
                                        : `rr--box rr--off`
                                    }
                                  >
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
                                  <div
                                    className={
                                      Number(comic.rating) >= 8.6
                                        ? `rr--box rr--on`
                                        : `rr--box rr--off`
                                    }
                                  >
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
                                  <div
                                    className={
                                      Number(comic.rating) >= 9.6
                                        ? `rr--box rr--on`
                                        : `rr--box rr--off`
                                    }
                                  >
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
                                <p className="text-sm text-[#A2A2A2] relative top-px">
                                  {Number(comic.rating)}
                                </p>
                              </div>
                              <div className="flex flex-row sm:flex-col w-full gap-2">
                                <div className="bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full">
                                  <h3 className="text-sm text-[#A2A2A2]">
                                    Status
                                  </h3>
                                  <h3 className="text-sm text-[#A2A2A2] capitalize">
                                    {comic.status}
                                  </h3>
                                </div>
                                <div className="bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full">
                                  <h3 className="text-sm text-[#A2A2A2]">
                                    Type
                                  </h3>
                                  <h3 className="text-sm text-white hover:text-themecolor capitalize cursor-pointer">
                                    {comic.category.name}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-9 pt-10">
                            <div className="text-center sm:text-left">
                              <span className="text-xl font-bold">
                                {comic.title}
                              </span>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1 py-4">
                              <Link
                                href={`https://www.facebook.com/sharer/sharer.php?u=/series/${comic.slug}&amp;t=${comic.title}`}
                                target="_blank"
                                className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-[#2f477b] hover:bg-[#2a4170] rounded-sm text-white w-[5rem] h-[22px]"
                              >
                                <Image
                                  decoding="async"
                                  loading="eager"
                                  width={500}
                                  height={500}
                                  src="/facebook.svg"
                                  alt="Facebook"
                                  className="w-[12px] h-[13px] mt-[1px]"
                                />
                                Facebook
                              </Link>
                              <Link
                                href={`https://www.twitter.com/intent/tweet?url=/series/${comic.slug}&amp;text=${comic.title}`}
                                target="_blank"
                                className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-[#1781c3] hover:bg-[#3d7fa8] rounded-sm text-white w-[5rem] h-[22px]"
                              >
                                <Image
                                  decoding="async"
                                  loading="eager"
                                  width={500}
                                  height={500}
                                  src="/twitter.svg"
                                  alt="Twitter"
                                  className="w-[13px] h-[13px] mr-[2px] mt-[1px]"
                                />
                                Twitter
                              </Link>
                              <Link
                                href={`whatsapp://send/?text=${comic.title}%20/series/${comic.slug}/`}
                                target="_blank"
                                className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-green-500 hover:bg-green-600 rounded-sm text-white w-[5rem] h-[22px]"
                              >
                                <Image
                                  decoding="async"
                                  loading="eager"
                                  width={500}
                                  height={500}
                                  src="/whatsapp.svg"
                                  alt="WhatsApp"
                                  className="w-[10.5px] h-[13px] pt-[1.5px]"
                                />
                                WhatsApp
                              </Link>
                              <Link
                                href={`https://pinterest.com/pin/create/button/?url=/series/${comic.slug}&amp;media=${comic.images[0].link}&amp;description=${comic.title}`}
                                target="_blank"
                                className="cursor-pointer flex item-center justify-center gap-x-1 text-xs font-medium pt-[2.5px] bg-red-500 hover:bg-red-600 rounded-sm text-white w-[5rem] h-[22px]"
                              >
                                <Image
                                  decoding="async"
                                  loading="eager"
                                  width={500}
                                  height={500}
                                  src="/pinterest.svg"
                                  alt="Pinterest"
                                  className="w-[10px] h-[15px] pt-[1px]"
                                />
                                Pinterest
                              </Link>
                            </div>
                            <h3 className="text-[#D9D9D9] font-medium text-sm py-0.5">
                              Synopsis {comic.title}
                            </h3>
                            <span className="font-medium text-sm text-[#A2A2A2]">
                              <p>{comic.description}</p>
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                              <div>
                                <h3 className="text-[#D9D9D9] font-medium text-sm">
                                  Serialization
                                </h3>
                                <h3 className="text-[#A2A2A2] text-sm">
                                  {comic.serialization}
                                </h3>
                              </div>
                              <div>
                                <h3 className="text-[#D9D9D9] font-medium text-sm">
                                  Author
                                </h3>
                                <h3 className="text-[#A2A2A2] text-sm">
                                  {comic.author.name}
                                </h3>
                              </div>
                              <div>
                                <h3 className="text-[#D9D9D9] font-medium text-sm">
                                  Artist
                                </h3>
                                <h3 className="text-[#A2A2A2] text-sm">
                                  {comic.artist.name}
                                </h3>
                              </div>
                              <div></div>
                              <div>
                                <h3 className="text-[#D9D9D9] font-medium text-sm">
                                  Updated On
                                </h3>
                                <h3 className="text-[#A2A2A2] text-sm">
                                  {comic.updated_at}
                                </h3>
                              </div>
                            </div>
                            {comic.genres?.length > 0 && (
                              <div className="space-y-1 pt-4">
                                <h3 className="text-[#D9D9D9] font-medium">
                                  Genres
                                </h3>
                                <div className="flex flex-row flex-wrap gap-3">
                                  {comic.genres.map((genre) => (
                                    <button
                                      key={genre.id}
                                      className="text-white hover:text-themecolor text-sm cursor-pointer rounded-[3px] px-3 py-1 bg-[#343434]"
                                    >
                                      {genre.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            id="_rht_toaster"
                            style={{
                              position: "fixed",
                              zIndex: "9999",
                              top: "16px",
                              left: "16px",
                              right: "16px",
                              bottom: "16px",
                              pointerEvents: "none",
                            }}
                          ></div>
                        </div>
                        <div className="border-t-[1px] border-t-[#A2A2A2]/20 py-4 px-5">
                          <h3 className="text-[#D9D9D9] font-medium text-xs">
                            Keywords:
                            <span className="text-[#A2A2A2] font-normal">
                              read {comic.title}, {comic.title} english,{" "}
                              {comic.title}
                              eng, download {comic.title} eng, {comic.title}{" "}
                              online
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#222222]">
                      <div className="border-b-[1px] border-[#312f40] font-bold leading-[33.6px] tracking-[0.27px] text-[#f5f5f5] pt-[18px] pb-3.5 pl-[30px] pr-6">
                        Chapter {comic.title}
                      </div>
                      <div className="grid grid-cols-2 px-4 py-4 gap-2.5">
                        <Link
                          href={`/series/${comic.slug}/chapter/${comic.first_chapter.slug}`}
                        >
                          <div className="flex flex-col items-center justify-center py-4 rounded-sm bg-themecolor hover:bg-[#343434] transition-all duration-300 cursor-pointer text-white">
                            <h3 className="truncate w-64 max-[600px]:w-48 max-[450px]:w-32 text-center">
                              First Chapter
                            </h3>
                            <h3 className="font-bold text-xl">
                              {comic.first_chapter.name}
                            </h3>
                          </div>
                        </Link>
                        <Link
                          href={`/series/${comic.slug}/chapter/${comic.last_chapter.slug}`}
                        >
                          <div className="flex flex-col items-center justify-center py-4 rounded-sm bg-themecolor hover:bg-[#343434] transition-all duration-300 cursor-pointer text-white">
                            {comic.last_chapter.title ? (
                              <h3 className="truncate w-64 max-[600px]:w-48 max-[450px]:w-32 text-center">
                                {comic.last_chapter.title}
                              </h3>
                            ) : (
                              <h3 className="truncate w-64 max-[600px]:w-48 max-[450px]:w-32 text-center">
                                New Chapter
                              </h3>
                            )}

                            <h3 className="font-bold text-xl">
                              {comic.last_chapter.name}
                            </h3>
                          </div>
                        </Link>
                      </div>
                      <div>
                        <div className="px-4 pb-4">
                          <input
                            className="w-full border bg-[#343434] rounded-sm py-1 px-2.5 placeholder:text-sm placeholder:text-[#a2a2a2c7] focus:outline-none focus:ring-0 focus:border-none"
                            placeholder={`Search Chapter. Example: ${comic.first_chapter.name} or ${comic.last_chapter.name}`}
                            type="text"
                          />
                        </div>
                        <div className="pl-4 pr-2 pb-4 overflow-y-auto scrollbar-thumb-themecolor scrollbar-track-transparent scrollbar-thin mr-3 max-h-[20rem] space-y-2.5">
                          {comic.chapters?.map((chapter) => (
                            <div
                              key={chapter.slug}
                              className="pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative"
                            >
                              <Link
                                href={`/series/${comic.slug}/chapter/${chapter.slug}`}
                              >
                                <div className="w-[5px] h-full bg-[#8E3FDD] absolute top-0 left-0 rounded block"></div>
                                <h3 className="text-sm text-white font-medium flex flex-row ` ${shouldHighlight(chapter.id) ? &#39;&#39; : &#39;text-themecolor&#39;}">
                                  {chapter.name}
                                  {chapter.title && (
                                    <span className="pl-1">
                                      {chapter.title}
                                    </span>
                                  )}
                                  <span className="pl-1"></span>
                                </h3>
                                <h3 className="text-xs text-[#A2A2A2]">
                                  {chapter.updated_at}
                                </h3>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#222222]">
                    <div className="py-2 px-5 border-b-[1px] border-b-[#A2A2A2]/20">
                      <h3 className="text-white font-semibold text-base">
                        Comments
                      </h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div id="disqus_thread">
                        <div>
                          <h2>Form</h2>
                          <form action="">
                            <div>
                              <label>Text</label>
                              <div>
                                <textarea name="text" id=""></textarea>
                              </div>
                            </div>
                            <div>
                              <button>Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#222222]">
                    <div className="py-2 px-5 border-b-[1px] border-b-[#A2A2A2]/20">
                      <h3 className="text-white font-semibold text-base">
                        Related Series
                      </h3>
                    </div>
                    <div className="grid md:hidden grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 gap-3 bg-[#222222] p-4">
                      <Link href="/series/solo-max-level-newbie-76d38a6a">
                        <div className="h-full flex flex-col rounded-sm pr-1 hover:opacity-60 hover:cursor-pointer hover:text-themecolor">
                          <div className="w-full h-64 sm:h-48 relative overflow-hidden">
                            <span className="status bg-blue-700">Ongoing</span>
                            <Image
                              decoding="async"
                              loading="eager"
                              alt=""
                              width={0}
                              height={0}
                              data-nimg="1"
                              className="rounded-md object-cover h-[270px] md:h-[200px]"
                              style={{ color: "transparent", width: "100%" }}
                              src="/accord-thumb-small.webp"
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
                    <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 gap-3 bg-[#222222] p-4">
                      <Link href="/series/solo-max-level-newbie-76d38a6a">
                        <div className="h-full flex flex-col rounded-sm pr-1 hover:opacity-60 hover:cursor-pointer hover:text-themecolor">
                          <div className="w-full h-64 sm:h-48 relative overflow-hidden">
                            <span className="status bg-blue-700">Ongoing</span>
                            <Image
                              decoding="async"
                              loading="eager"
                              alt=""
                              width={0}
                              height={0}
                              data-nimg="1"
                              className="rounded-md object-cover h-[270px] md:h-[200px]"
                              style={{ color: "transparent", width: "100%" }}
                              src="/accord-thumb-small.webp"
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
                </div>
              </div>
              <Rightbar />
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
  // Fetch or define your comics (e.g., from an API or database)
  const res = await fetch("http://localhost:8000/api/comics/");
  const comics = await res.json();
  return comics.results.map((comic: Comic) => ({
    slug: comic.slug,
  }));
}
