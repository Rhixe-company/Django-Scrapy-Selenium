import React from "react";
import Link from "next/link";
import { Suspense } from "react";
import ComicList from "./ComicList";
import Loading from "../loading";
export const metadata = {
  title: "Rhixe Scans | Comics",
};
export default function page() {
  return (
    <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
      <div className="w-[100%] float-left min-[882px]:w-[68.5%] min-[1030px]:w-[70%] max-[600px]:w-[100%] relative z-0">
        <div className="w-full min-[768px]:w-[100%] bg-[#222222] min-[880px]:w-[98%] min-[912px]:w-[98%] lg:w-[100%] mb-2">
          <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px] p-2 mt-5 sm:mt-0">
            <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
              Comics list
            </h3>
          </div>
          <Suspense fallback={<Loading />}>
            <ComicList />
          </Suspense>
        </div>
      </div>
      <div className="w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right">
        <div className="lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px]">
          <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
            <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
              Comic Functions
            </h3>
          </div>
          <div className="bg-[#222222]">
            <div>
              <div className="px-2.5 pt-[11px]">
                <div
                  className="items-center p-1 text-muted-foreground grid w-[100%] px-1.5 grid-cols-3 h-8 rounded-[2px] justify-center bg-[#333]"
                  style={{ outline: "none" }}
                >
                  <Link
                    href="/comic/create"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm  hover:text-themecolor  text-[12px] bg-themecolor text-white h-[22px] px-8 font-normal"
                  >
                    Add new Comic
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
