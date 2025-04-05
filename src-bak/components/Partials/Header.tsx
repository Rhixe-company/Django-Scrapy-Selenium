import React from "react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="bg-[#913fe2] py-1">
      <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-5 px-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex h-12 w-12">
            <Image
              className="object-cover"
              src="/logo.webp"
              alt="RhixeScans logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          <ul className="hidden flex-row md:flex">
            <li>
              <Link href="/">
                <span className="hover:bg-opacity-40 block pt-0 pr-[10px] pb-0 pl-[8px] text-[13px] leading-[42px] tracking-wider text-white hover:bg-gray-900 hover:text-white">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <span className="hover:bg-opacity-40 block pt-0 pr-[10px] pb-0 pl-[8px] text-[13px] leading-[42px] tracking-wider text-white hover:bg-gray-900 hover:text-white">
                  Bookmarks
                </span>
              </Link>
            </li>
            <li>
              <Link href="/series">
                <span className="hover:bg-opacity-40 block pt-0 pr-[10px] pb-0 pl-[8px] text-[13px] leading-[42px] tracking-wider text-white hover:bg-gray-900 hover:text-white">
                  Comics
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full">
          <div className="w-full flex-row items-center gap-3.5">
            <div className="hidden w-full flex-row items-center gap-3.5 md:flex">
              <div className="hidden w-full items-center justify-end md:flex">
                <input
                  className="relative w-[95%] rounded-lg border-[1px] border-black bg-[#16151D] px-4 py-1 text-white outline-none sm:w-[55%] sm:py-2 md:w-[55%] lg:w-[40%]"
                  placeholder="Search"
                  type="text"
                />
                <svg
                  className="absolute h-8 w-8 cursor-not-allowed pt-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div style={{ opacity: 1 }}>
                <div className="hidden flex-row items-center gap-3.5 md:flex">
                  <div>
                    <div className="relative">
                      <button
                        className="flex w-full items-center justify-center"
                        type="button"
                      >
                        <div style={{ opacity: 1, transform: "none" }}>
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
                            className="lucide lucide-bell h-6 w-6"
                          >
                            <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                          </svg>
                          <span className="absolute end-0 top-5 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                            1
                          </span>
                        </div>
                      </button>
                    </div>
                    <div
                      style={{
                        position: "fixed",
                        zIndex: 9999,
                        inset: "16px",
                        pointerEvents: "none",
                      }}
                    ></div>
                  </div>
                  <button
                    className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium whitespace-nowrap transition-colors hover:bg-purple-800/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    type="button"
                    data-state="closed"
                  >
                    <Image
                      src="/profile-picture.webp"
                      alt="User"
                      className="h-8 w-8 rounded-full ring-2 ring-purple-400/20"
                      width={100}
                      height={100}
                      priority
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="gap3.5 flex flex-row items-center md:hidden">
              <div className="flex flex-grow flex-row items-center justify-end space-x-1">
                <button className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-purple-800/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
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
                    className="lucide lucide-search h-5 w-5"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
                <div style={{ opacity: 1 }}>
                  <div>
                    <div className="relative">
                      <button
                        className="flex w-full items-center justify-center"
                        type="button"
                      >
                        <div style={{ opacity: 1, transform: "none" }}>
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
                            className="lucide lucide-bell h-6 w-6"
                          >
                            <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                          </svg>
                          <span className="absolute end-0 top-5 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                            1
                          </span>
                        </div>
                      </button>
                    </div>
                    <div
                      style={{
                        position: "fixed",
                        zIndex: 9999,
                        inset: "16px",
                        pointerEvents: "none",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="block md:hidden">
                  <button
                    className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-purple-800/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    type="button"
                    data-state="closed"
                  >
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
                      className="lucide lucide-menu h-5 w-5"
                    >
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
