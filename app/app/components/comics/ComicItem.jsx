"use client";
import { fetchComic } from "@/app/lib/comics/actions";

import { Fragment, useEffect } from "react";
import Spinner from "@/app/components/Spinner";
import MyError from "@/app/components/MyError";
import { useDispatch, useSelector } from "react-redux";
export const ComicItem = () => {
  const dispatch = useDispatch();
  const useritem = useSelector((state) => state.user.useritem);
  const { isError, isFetching, isSuccess, errorMessage, comicitem } =
    useSelector((state) => state.comic);
  useEffect(() => {
    dispatch(
      fetchComic({
        slug: "a-villains-will-to-survive",
        token: useritem.access,
      })
    );
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
        <div className="mb-4 flex flex-col items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            {comicitem.title}
          </h5>
          <p>{comicitem.description}</p>
          <span>{comicitem.status}</span>
        </div>
      </Fragment>
    );
  }

  return null;
};
