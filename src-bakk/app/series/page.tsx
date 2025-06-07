import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/comics", {
    cache: "no-cache",
  });
  const comics = await response.json();

  if (comics) {
    return (
      <>
        <div className="w-[100%] float-left min-[882px]:w-[68.5%] min-[1030px]:w-[70%] max-[600px]:w-[100%] relative z-0">
          <div className="w-full min-[768px]:w-[100%] bg-[#222222] min-[880px]:w-[98%] min-[912px]:w-[98%] lg:w-[100%] mb-2">
            <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px] p-2 mt-5 sm:mt-0">
              <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
                Series list
              </h3>
            </div>
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-5 bg-[#222222] sm:gap-[6px] gap-[3px] px-2.5 sm:px-3 pt-[12px]">
                <div className="bg-[#222222] sm:m-[2px] m-[4px]">
                  <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
                    <span className="mt-0.5 capitalize"> Genre All</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-0"
                    >
                      <path
                        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="bg-[#222222] sm:m-[2px] m-[4px]">
                  <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
                    <span className="mt-0.5 capitalize"> Status All</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-0"
                    >
                      <path
                        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="bg-[#222222] sm:m-[2px] m-[4px]">
                  <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
                    <span className="mt-0.5 capitalize"> Type All</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-0"
                    >
                      <path
                        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="bg-[#222222] sm:m-[2px] m-[4px]">
                  <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
                    <span className="mt-0.5 capitalize">
                      Order by Last Up...
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-0"
                    >
                      <path
                        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="bg-[#222222] mt-[2px] ml-[2px] mb-[2px] mr-[3px] hidden sm:block">
                  <button
                    className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-white text-[12px] font-normal border-none rounded-none h-[26px] bg-themecolor hover:bg-[#333] hover:text-white"
                    type="submit"
                    form="hook-form"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-0.5"
                    >
                      <path
                        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                        fill="none"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></path>
                    </svg>
                    <span className="pt-0.5">Search</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 bg-[#222222] gap-1 p-4 pb-1 pt-2 sm:hidden">
                <button
                  className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-white text-[12px] font-normal h-[26px] border-solid rounded-[2px] bg-themecolor hover:bg-[#333] hover:text-white"
                  type="submit"
                  form="hook-form"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-0.5"
                  >
                    <path
                      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                      fill="none"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                  </svg>
                  <span className="pt-0.5">Search</span>
                </button>
              </div>
              <div className="bg-[#222222] border-[#222222] sm:pr-3 sm:pl-3 overflow-hidden">
                <div className="bg-[#333] sm:max-h-[240px] overflow-hidden overflow-y-auto w-[68%] border-[#333333] mt-[-30px] sm:mt-1 absolute rounded-none z-10 max-[600px]:w-[100%] max-[768px]:w-[96.5%] max-[860px]:w-[93%] max-[882px]:w-[63%] max-[912px]:w-[66%]">
                  <form id="hook-form" className=""></form>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4">
              <Link href="series/absolute-necromancer-faa4a07a">
                <div className="w-full block sm:block hover:cursor-pointer group hover:text-themecolor">
                  <div>
                    <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
                      <span className="status bg-blue-700">Ongoing</span>
                      <Image
                        alt=""
                        loading="lazy"
                        width={100}
                        height={100}
                        decoding="async"
                        data-nimg="1"
                        className="rounded-md"
                        style={{
                          color: "transparent",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        src="/01JNQC2ZQ5BFJS67YKY1VDA0K5-thumb-small.webp"
                      />
                      <div className="absolute bottom-[0px] flex justify-center left-[5px] mb-[5px] rounded-[3px] text-white bg-[#a12e24]">
                        <span className="text-[10px] font-bold py-[2px] px-[7px]">
                          MANHWA
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
                        Absolute Necromancer
                      </span>
                      <span className="text-[13px] text-[#999]">
                        Chapter 71
                      </span>
                      <span className="flex text-[12px] text-[#999]">
                        <div
                          className="rr--group rr--dir-x rr--space-sm myrr"
                          role="img"
                          aria-label="Rated 4.75 on 5"
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
                        <label className="ml-1">9.5</label>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="series/logging-10000-years-into-the-future-8244a25a">
                <div className="w-full block sm:block hover:cursor-pointer group hover:text-themecolor">
                  <div>
                    <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
                      <span className="status bg-blue-700">Ongoing</span>
                      <Image
                        alt=""
                        loading="lazy"
                        width={100}
                        height={100}
                        decoding="async"
                        data-nimg="1"
                        className="rounded-md"
                        style={{
                          color: "transparent",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        src="/49ab5c70-thumb-small.webp"
                      />
                      <div className="absolute bottom-[0px] flex justify-center left-[5px] mb-[5px] rounded-[3px] text-white bg-[#009688]">
                        <span className="text-[10px] font-bold py-[2px] px-[7px]">
                          MANHUA
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
                        Logging 10,000 Years into the Future
                      </span>
                      <span className="text-[13px] text-[#999]">
                        Chapter 198
                      </span>
                      <span className="flex text-[12px] text-[#999]">
                        <div
                          className="rr--group rr--dir-x rr--space-sm myrr"
                          role="img"
                          aria-label="Rated 4.9 on 5"
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
                        <label className="ml-1">9.8</label>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center py-[15px] bg-[#222222]">
              <div className="flex items-center justify-center py-[15px] bg-[#222222]">
                <button
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
          </div>
        </div>
        <div className="w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right">
          <div className="lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px] mt-3 md:mt-0">
            <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
              <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
                Popular
              </h3>
            </div>
            <div className="bg-[#222222]">
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
                      aria-controls="radix-:R19uuduja:-content-weekly"
                      data-state="active"
                      id="radix-:R19uuduja:-trigger-weekly"
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
                      aria-controls="radix-:R19uuduja:-content-monthly"
                      data-state="inactive"
                      id="radix-:R19uuduja:-trigger-monthly"
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
                      aria-controls="radix-:R19uuduja:-content-all"
                      data-state="inactive"
                      id="radix-:R19uuduja:-trigger-all"
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
                    aria-labelledby="radix-:R19uuduja:-trigger-weekly"
                    id="radix-:R19uuduja:-content-weekly"
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
                            href="series/a-villains-will-to-survive-e117a794"
                            className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
                          >
                            <Image
                              alt="poster"
                              fetchPriority="high"
                              width={100}
                              height={100}
                              decoding="async"
                              data-nimg="1"
                              className="w-full cursor-pointer"
                              style={{
                                color: "transparent",
                                width: "100px",
                                height: "auto",
                                maxHeight: "110px",
                              }}
                              src="/01JN6E53XAQAGF2Q5ZQ5NYY21E-thumb-small.webp"
                            />
                          </Link>
                        </div>
                        <div className="w-full p-0 overflow-hidden">
                          <span className="block">
                            <Link
                              href="series/a-villains-will-to-survive-e117a794"
                              className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
                            >
                              A Villains Will to Survive
                            </Link>
                          </span>
                          <span>
                            <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                              <b>Genres:</b>
                              <Link
                                href="series?page=1&amp;genres=1"
                                className="text-white hover:text-themecolor cursor-pointer"
                              >
                                Action,
                              </Link>
                              <Link
                                href="series?page=1&amp;genres=4"
                                className="text-white hover:text-themecolor cursor-pointer"
                              >
                                Adventure,
                              </Link>
                              <Link
                                href="series?page=1&amp;genres=7"
                                className="text-white hover:text-themecolor cursor-pointer"
                              >
                                Comedy,
                              </Link>
                              <Link
                                href="series?page=1&amp;genres=16"
                                className="text-white hover:text-themecolor cursor-pointer"
                              >
                                Fantasy,
                              </Link>
                            </p>
                          </span>
                          <span>
                            <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                              <b>Genres:</b>
                              <Link
                                href="series?page=1&amp;genres=1"
                                className="text-white hover:text-themecolor cursor-pointer"
                                style={{ marginBottom: "-10px" }}
                              >
                                Action,
                              </Link>
                              <Link
                                href="series?page=1&amp;genres=4"
                                className="text-white hover:text-themecolor cursor-pointer"
                                style={{ marginBottom: "-10px" }}
                              >
                                Adventure,
                              </Link>
                              <Link
                                href="series?page=1&amp;genres=7"
                                className="text-white hover:text-themecolor cursor-pointer"
                                style={{ marginBottom: "-10px" }}
                              >
                                Comedy,
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
                              <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
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
                    data-orientation="horizontal"
                    role="tabpanel"
                    aria-labelledby="radix-:R19uuduja:-trigger-monthly"
                    hidden
                    id="radix-:R19uuduja:-content-monthly"
                    tabIndex={0}
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  ></div>
                </div>
                <div>
                  <div
                    data-state="inactive"
                    data-orientation="horizontal"
                    role="tabpanel"
                    aria-labelledby="radix-:R19uuduja:-trigger-all"
                    hidden
                    id="radix-:R19uuduja:-content-all"
                    tabIndex={0}
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
