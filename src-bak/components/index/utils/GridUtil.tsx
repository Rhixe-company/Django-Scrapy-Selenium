import React from "react";
import Link from "next/link";
import GridUtilItem from "./GridUtilItem";
interface ComicListProps {
  comics: Comic[];
}

const GridUtil = ({ comics }: ComicListProps) => {
  return (
    <div className="mt-5 mb-1 text-white md:mb-5">
      <div className="font-500 relative flex justify-between border-b-[1px] border-[#312f40] bg-[#222222] px-[15px] py-[8px] align-baseline">
        <h3 className="m-0 text-[15px] leading-5 font-semibold text-white">
          Latest Updates
        </h3>
        <Link
          href="/series"
          className="rounded-[3px] bg-[#913fe2] p-1 text-[8.5px] text-white uppercase hover:cursor-pointer"
        >
          View all
        </Link>
      </div>
      <GridUtilItem items={comics} />
    </div>
  );
};

export default GridUtil;
