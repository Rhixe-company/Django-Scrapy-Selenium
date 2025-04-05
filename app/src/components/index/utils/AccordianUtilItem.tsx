import React from "react";
import Link from "next/link";
import Image from "next/image";
const AccordianUtilItem = () => {
  return (
    <div>
      <div>
        <div
          data-state="active"
          className="ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          style={{ animationDuration: "0s" }}
        >
          <div>
            <div className="relative flex h-[104px] overflow-hidden border-b border-[#383838] px-[15px] py-3">
              <div className="flex items-center justify-center">
                <div className="vertical-middle absolute ml-[25px] h-[25px] w-[25px] rounded-[3px] border-[0.5px] border-solid border-[#888] text-center text-[14px] leading-[25px] text-[#888]">
                  1
                </div>
              </div>
              <div className="float-left mt-0.5 mr-2 mb-2.5 ml-[37px] flex h-[72px] max-h-[80px] max-w-[55px] overflow-hidden rounded-[3px]">
                <Link
                  href="https://asuracomic.net/series/a-villains-will-to-survive-e117a794"
                  className="decoration-none overflow-hidden text-[13px] font-[500] text-[#fff]"
                >
                  <Image
                    alt="poster"
                    width={100}
                    height={100}
                    className="accordianUtil_image w-full cursor-pointer"
                    src="/testcomic2.webp"
                  />
                </Link>
              </div>
              <div className="w-full overflow-hidden p-0">
                <span className="block">
                  <Link
                    href="https://asuracomic.net/series/a-villains-will-to-survive-e117a794"
                    className="block cursor-pointer overflow-hidden text-[13px] leading-[1.2] font-[500] text-[#fff] hover:text-[#913fe2] md:text-[12px] xl:text-[13px]"
                  >
                    A Villains Will to Survive
                  </Link>
                </span>
                <span>
                  <p className="mt-1 text-[12px] leading-[1.3] text-[#888] sm:hidden xl:inline-block">
                    <b>Genres:</b>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                    >
                      Action,
                    </Link>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                    >
                      Adventure,
                    </Link>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                    >
                      Comedy,
                    </Link>
                    <Link
                      href="#6"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                    >
                      Fantasy,
                    </Link>
                  </p>
                </span>
                <span>
                  <p className="mt-1 hidden overflow-hidden text-[11px] leading-[1.2] text-[#888] sm:inline-block sm:text-[11px] md:text-[12px] lg:text-[11px] xl:hidden">
                    <b>Genres:</b>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                      style={{ marginBottom: "-10px" }}
                    >
                      Action,
                    </Link>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                      style={{ marginBottom: "-10px" }}
                    >
                      Adventure,
                    </Link>
                    <Link
                      href="#"
                      className="cursor-pointer text-white hover:text-[#913fe2]"
                      style={{ marginBottom: "-10px" }}
                    >
                      Comedy,
                    </Link>
                  </p>
                </span>
                <div className="mt-[-2px]">
                  <div className="overflow-hidden">
                    <div className="float-left">
                      <div className="mb-[-1px] inline-block overflow-hidden">
                        <div
                          className="rr--group rr--dir-x rr--space-sm myrating"
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
                      </div>
                    </div>
                    <div className="ml-[5px] inline-block text-[12px] leading-normal text-[#999] italic">
                      9.9
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
          className="ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        ></div>
      </div>
      <div>
        <div
          data-state="inactive"
          className="ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        ></div>
      </div>
    </div>
  );
};

export default AccordianUtilItem;
