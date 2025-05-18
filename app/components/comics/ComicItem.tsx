"use client";
import {
  fetchComic,
  comicSelector,
  clearState,
} from "@/lib/features/comics/comicSlice";
import { useState, Fragment, useEffect } from "react";
import Spinner from "@/components/Spinner";
import MyError from "@/components/MyError";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const ComicItem = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, errorMessage } =
    useSelector(comicSelector);
  useEffect(() => {
    dispatch(fetchComic({ slug: "a-villains-will-to-survive" }));
  }, []);
  const { item } = useSelector(comicSelector);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isError]);

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
