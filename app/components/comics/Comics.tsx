"use client";
import { useGetComicsQuery } from "@/lib/features/comics/comicsApiSlice";
import { useState, Fragment, Key } from "react";
import Link from "next/link";
import Image from "next/image";
import { Comic } from "@/lib/features/comics/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Comics = () => {
  const [pageNumber, setPageNumber] = useState(1);
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useGetComicsQuery(pageNumber);

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    function range(start: number, end: number): any {
      if (start === end) return [start];
      return [start, ...range(start + 1, end)];
    }
    const numbers = range(1, data.numpages);

    return (
      <Fragment>
        <div className="w-full max-w-full rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
              Latest Comics
            </h5>
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </Link>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {data.results.map((item: Comic) => (
                <li className="py-3 sm:py-4" key={item.slug}>
                  <div className="flex items-center">
                    <div className="shrink-0">
                      {item.images[0].image ? (
                        <Image
                          width={40}
                          height={30}
                          unoptimized
                          className="h-8 w-8 rounded-full"
                          src={`http://127.0.0.1:8000${item.images[0].image}`}
                          alt={item.title}
                        />
                      ) : (
                        <Image
                          width={40}
                          height={30}
                          className="h-8 w-8 rounded-full"
                          src={`${item.images[0].link}`}
                          // src={item.images[0].image}
                          alt={item.title}
                        />
                      )}
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {item.category.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.rating}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="size-5" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  {numbers.map((num: any, index: Key | null | undefined) => (
                    <button
                      key={index}
                      onClick={() => {
                        setPageNumber(Number(num));
                      }}
                      aria-current={num === pageNumber && "page"}
                      className={
                        num === pageNumber
                          ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {num}
                    </button>
                  ))}

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="size-5" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return null;
};
