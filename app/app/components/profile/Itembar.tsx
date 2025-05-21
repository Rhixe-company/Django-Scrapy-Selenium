"use client";
import React from "react";
import { useAppSelector } from "@/app/services/hooks";
import { userSelector } from "@/app/services/slices/UserSlice";
import { useGetUserQuery } from "@/app/services/UserService";

export default function Itembar() {
  const { id } = useAppSelector(userSelector);

  const {
    data,
    error,
    isLoading: isUserLoading,
    isSuccess: isUserQueried,
    isFetching: isUserFetching,
    isError: isUserError,
  }: any = useGetUserQuery(id);

  return (
    <div>
      <h2>{data?.email}</h2>
    </div>
  );
}
