"use client";
import { useGetComicQuery } from "@/lib/features/comics/comicsApiSlice";
import { Fragment } from "react";
import Spinner from "@/components/Spinner";
import MyError from "@/components/MyError";

export const ComicItem = () => {
  const { data, isError, isLoading, isSuccess } = useGetComicQuery(
    "a-villains-will-to-survive",
  );

  if (isError) {
    return <MyError />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            {data.title}
          </h5>
          <p>{data.description}</p>
          <span>{data.status}</span>
        </div>
      </Fragment>
    );
  }

  return null;
};
