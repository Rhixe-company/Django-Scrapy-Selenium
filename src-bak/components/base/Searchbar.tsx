"use client";
import { useEffect } from "react";

export default function Searchbar() {
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
    <>
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
    </>
  );
}
