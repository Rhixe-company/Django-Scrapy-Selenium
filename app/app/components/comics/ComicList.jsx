"use client";
import { fetchComics } from "@/store/comics/actions";
import { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import MyError from "@/app/components/MyError";
import CustomPagination from "@/app/components/comics/CustomPagination";
import { useDispatch, useSelector } from "react-redux";

export const ComicList = () => {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const { isError, isFetching, isSuccess, errorMessage, comicitems } =
    useSelector((state) => state.comic);

  useEffect(() => {
    dispatch(fetchComics({ pagenumber: pageNumber, keyword: keyword }));
  }, []);

  if (isError) {
    return <MyError message={errorMessage} />;
  }

  if (isFetching) {
    return <Spinner />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {comicitems.results.map((item) => (
              <li className="py-3 sm:py-4" key={item.slug}>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <Link href={`/comic/${item.slug}`}>
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
                          alt={item.title}
                        />
                      )}
                    </Link>
                  </div>
                  <div className="ms-4 min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      <Link href={`/comic/${item.slug}`}>{item.title}</Link>
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
        <CustomPagination
          numpages={comicitems.numpages}
          links={comicitems.links}
          count={comicitems.count}
          setpagenumber={setPageNumber}
          pagenumber={pageNumber}
        />
      </Fragment>
    );
  }

  return null;
};
