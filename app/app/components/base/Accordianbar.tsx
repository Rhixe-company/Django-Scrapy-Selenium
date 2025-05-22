import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Accordianbar() {
  return (
    <div dir="ltr" data-orientation="horizontal">
      <div className="px-2.5 pt-[11px]">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="items-center p-1 text-muted-foreground grid w-[100%] px-1.5 grid-cols-3 h-8 rounded-[2px] justify-center bg-[#333]"
          tabIndex={0}
          data-orientation="horizontal"
          style={{ outline: "none" }}
        >
          <button
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="content-weekly"
            data-state="active"
            id="trigger-weekly"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            Weekly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="content-monthly"
            data-state="inactive"
            id="trigger-monthly"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="content-all"
            data-state="inactive"
            id="trigger-all"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            All
          </button>
        </div>
      </div>
      <div>
        <div
          data-state="active"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="trigger-weekly"
          id="content-weekly"
          tabIndex={0}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ animationDuration: "0s" }}
        >
          <div>
            <div className="flex px-[15px] py-3 overflow-hidden h-[104px] relative border-b border-[#383838]">
              <div className="flex items-center justify-center">
                <div className="h-[25px] w-[25px] text-center leading-[25px] text-[14px] text-[#888] absolute vertical-middle ml-[25px] rounded-[3px] border-solid border-[0.5px] border-[#888]">
                  1
                </div>
              </div>
              <div className="flex overflow-hidden mt-0.5 mb-2.5 ml-[37px] mr-2 float-left max-w-[55px] h-[72px] max-h-[80px] rounded-[3px]">
                <Link
                  href="/series/the-illegitimate-who-devours-weapons"
                  className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
                >
                  <Image
                    decoding="async"
                    loading="eager"
                    alt="poster"
                    width={70}
                    height={70}
                    quality={100}
                    className="w-full cursor-pointer"
                    style={{
                      color: "transparent",
                      width: "100px",
                      height: "auto",
                      maxHeight: "110px",
                    }}
                    src="/accord-thumb-small.webp"
                  />
                </Link>
              </div>
              <div className="w-full p-0 overflow-hidden">
                <span className="block">
                  <Link
                    href="/series/the-illegitimate-who-devours-weapons"
                    className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
                  >
                    The Illegitimate Who Devours W...
                  </Link>
                </span>
                <span>
                  <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                    <b>Genres:</b>
                    <Link
                      href="/series?page=1&amp;genres=1"
                      className="text-white hover:text-themecolor cursor-pointer"
                    >
                      Action,
                    </Link>
                    <Link
                      href="/series?page=1&amp;genres=4"
                      className="text-white hover:text-themecolor cursor-pointer"
                    >
                      Adventure,
                    </Link>
                    <Link
                      href="/series?page=1&amp;genres=16"
                      className="text-white hover:text-themecolor cursor-pointer"
                    >
                      Fantasy,
                    </Link>
                    <Link
                      href="/series?page=1&amp;genres=29"
                      className="text-white hover:text-themecolor cursor-pointer"
                    >
                      Martial Arts,
                    </Link>
                  </p>
                </span>
                <span>
                  <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                    <b>Genres:</b>
                    <Link
                      href="/series?page=1&amp;genres=1"
                      className="text-white hover:text-themecolor cursor-pointer"
                      style={{ marginBottom: "-10px" }}
                    >
                      Action,
                    </Link>
                    <Link
                      href="/series?page=1&amp;genres=4"
                      className="text-white hover:text-themecolor cursor-pointer"
                      style={{ marginBottom: "-10px" }}
                    >
                      Adventure,
                    </Link>
                    <Link
                      href="/series?page=1&amp;genres=16"
                      className="text-white hover:text-themecolor cursor-pointer"
                      style={{ marginBottom: "-10px" }}
                    >
                      Fantasy,
                    </Link>
                  </p>
                </span>
                <div className="mt-[-2px]">
                  <div className="overflow-hidden">
                    <div className="float-left">
                      <div className="overflow-hidden inline-block mb-[-1px]">
                        <div
                          className="rr--group rr--dir-x rr--space-sm myrr"
                          role="img"
                          aria-label="Rated 4.8 on 5"
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
                      </div>
                    </div>
                    <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
                      9.6
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          data-state="inactive"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="trigger-monthly"
          hidden
          id="content-monthly"
          tabIndex={0}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        ></div>
      </div>
      <div>
        <div
          data-state="inactive"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="trigger-all"
          hidden
          id="content-all"
          tabIndex={0}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        ></div>
      </div>
    </div>
  );
}
