import React from "react";
import Accordianbar from "@/app/components/base/Accordianbar";
import fetchSelectedComics from "@/lib/comic/fetchSelectedComics";
import type { ComicsSelect } from "@/models/comics";
export default async function Rightbar() {
  const url = "http:localhost:8000/api/comics/selected/";
  const comics: ComicsSelect | undefined = await fetchSelectedComics(url);
  if (!comics)
    return <h2 className="m-4 text-2xl font-bold">No Top Comics Found</h2>;
  return (
    <div className="w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right">
      <div className="lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px]">
        <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
          <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
            Popular
          </h3>
        </div>
        <div className="bg-[#222222]">
          <Accordianbar comics={comics} />
        </div>
      </div>
    </div>
  );
}
