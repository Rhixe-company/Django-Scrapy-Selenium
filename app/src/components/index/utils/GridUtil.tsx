import React from "react";
import Link from "next/link";
import GridUtilItem from "@/components/index/utils/GridUtilItem";
export default function GridUtil({ comics }) {
  // const data = fetch("http://localhost:8000/api/comics/");
  // const comics = data.json();
  // console.log(comics);

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
      <GridUtilItem items={comics.results} />

      <div className="flex items-center justify-center bg-[#222222] py-[15px]">
        <Link
          href="1"
          className="mr-1 flex w-[110px] cursor-pointer items-center rounded-[2px] bg-slate-500 px-5 py-1.5 text-center text-[13px] text-white opacity-60"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
          Previous{" "}
        </Link>
        <Link
          href="page/2"
          className="flex w-[110px] items-center rounded-[2px] bg-[#913fe2] px-8 py-1.5 text-center text-[13px] text-white"
          style={{ pointerEvents: "auto" }}
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
