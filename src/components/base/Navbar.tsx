"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const searchForm = document.getElementById("searchform") as HTMLBodyElement;

    const searchButton = document.getElementById(
      "searchbutton"
    ) as HTMLBodyElement;
    const searchButton1 = document.getElementById(
      "searchbutton1"
    ) as HTMLBodyElement;
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        searchButton.classList.add("hidden");
        searchButton1.classList.remove("hidden");
        searchButton1.classList.add("inline-flex");
        searchForm.classList.remove("hidden");
      });
    }
    if (searchButton1) {
      searchButton1.addEventListener("click", () => {
        searchButton.classList.remove("hidden");
        searchButton1.classList.add("hidden");
        searchButton1.classList.remove("inline-flex");
        searchForm.classList.add("hidden");
      });
    }
  }, []);

  return (
    <header className="bg-themecolor py-1">
      <div className="max-w-[1220px] flex mx-auto px-2 items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex h-12 w-12">
            <Image
              className="object-cover logoimage"
              src="/logo.webp"
              alt="Rhixe logo"
              width={100}
              height={100}
            />
          </Link>
          <ul className="hidden md:flex flex-row">
            <li>
              <Link href="/">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Bookmarks
                </span>
              </Link>
            </li>
            <li>
              <Link href="/series?page=1">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Comics
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full">
          <div className="flex-row w-full gap-3.5 items-center">
            <div className="hidden md:flex flex-row w-full gap-3.5 items-center">
              <div className="hidden md:flex justify-end items-center w-full">
                <input
                  type="text"
                  className="relative w-[95%] sm:w-[55%] md:w-[55%] lg:w-[40%] text-white px-4 py-1 sm:py-2 rounded-lg border-[1px] bg-[#16151D] border-black outline-none"
                  placeholder="Search"
                />
                <svg
                  className="h-8 w-8 absolute pt-1 text-white cursor-not-allowed"
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

              <div style={{ width: "auto" }}>
                <Link
                  className="rounded-full flex items-center justify-center bg-[#121212]"
                  href="/sign-in"
                >
                  <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
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
                      className="lucide lucide-user-round w-3 h-3"
                    >
                      <circle cx="12" cy="8" r="5"></circle>
                      <path d="M20 21a8 8 0 0 0-16 0"></path>
                    </svg>
                    <p>Login</p>
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex md:hidden flex-row gap3.5 items-center">
              <div className="flex flex-row flex-grow items-center justify-end space-x-1">
                <div id="searchform" className="flex-1 hidden">
                  <div className="relative">
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
                      className="lucide lucide-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input
                      className="flex h-10 rounded-md border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full border-0 bg-purple-800/50 pl-9 text-white placeholder:text-white/70 focus-visible:ring-1 focus-visible:ring-purple-400"
                      placeholder="Search comics..."
                    />
                  </div>
                </div>
                <button
                  id="searchbutton1"
                  className="hidden items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50"
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
                    className="lucide lucide-x h-5 w-5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
                <button
                  id="searchbutton"
                  className=" inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50"
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
                    className="lucide lucide-search h-5 w-5"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>

                <div style={{ width: "auto" }}>
                  <Link
                    className="rounded-full flex items-center justify-center bg-[#121212]"
                    href="/sign-in"
                  >
                    <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
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
                        className="lucide lucide-user-round w-3 h-3"
                      >
                        <circle cx="12" cy="8" r="5"></circle>
                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                      </svg>
                      <p>Login</p>
                    </button>
                  </Link>
                </div>

                <div className="block md:hidden">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50">
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
      <div className="md:hidden">
        <div
          className="fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-open:animate-in data-closed:animate-out data-closed:duration-300 data-open:duration-500 inset-y-0 right-0 h-full data-closed:slide-out-to-right data-open:slide-in-from-right sm:max-w-sm w-full max-w-xs border-l-0 bg-gradient-to-b from-[#1a1a1a] to-purple-900 p-0"
          tabIndex={-1}
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-1 p-4">
              <Link
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                type="button"
                href="/"
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
                  className="lucide lucide-house h-5 w-5"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>Home</span>
              </Link>
              <Link
                href="/series"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                type="button"
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
                  className="lucide lucide-library h-5 w-5"
                >
                  <path d="m16 6 4 14"></path>
                  <path d="M12 6v14"></path>
                  <path d="M8 8v12"></path>
                  <path d="M4 4v16"></path>
                </svg>
                <span>Comics</span>
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                type="button"
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
                  className="lucide lucide-bookmark h-5 w-5"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
                <span>Bookmarks</span>
              </Link>
            </div>
            <div className="border-t border-white/10 p-4">
              <button
                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10"
                type="button"
              >
                <Link href="/sign-in" className="flex flex-row gap-2">
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
                    className="lucide lucide-log-in h-5 w-5"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" x2="3" y1="12" y2="12"></line>
                  </svg>
                  <span>Login</span>
                </Link>
              </button>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary"
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
              className="lucide lucide-x h-4 w-4"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </header>
  );
}
