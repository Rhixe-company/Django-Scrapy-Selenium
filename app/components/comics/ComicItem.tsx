"use client";
import { fetchComic } from "@/store/comics/actions";
import { clearState } from "@/store/comics/comicSlice";
import { useState, Fragment, useEffect } from "react";
import Spinner from "@/components/Spinner";
import MyError from "@/components/MyError";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
export const ComicItem = () => {
  const dispatch = useAppDispatch();
  const useritem: any = useAppSelector((state) => state.user.item);
  const { isError, isFetching, isSuccess, errorMessage, item }: any =
    useAppSelector((state) => state.comic);
  useEffect(() => {
    dispatch(
      fetchComic({
        slug: "a-villains-will-to-survive",
        token: useritem.access,
      })
    );
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
  }, [isError]);

  if (isError) {
    return <MyError />;
  }

  if (isFetching) {
    return <Spinner />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            {item.title}
          </h5>
          <p>{item.description}</p>
          <span>{item.status}</span>
        </div>
      </Fragment>
    );
  }

  return null;
};
