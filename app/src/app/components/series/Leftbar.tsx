import React from "react";

import Gridbar from "@/app/components/series/Gridbar";
import Loading from "@/app/(dashboard)/loading";
import { Suspense } from "react";
import Herobar from "@/app/components/series/Herobar";

export default async function Leftbar() {
  return (
    <div className="w-[100%] float-left min-[882px]:w-[68.5%] min-[1030px]:w-[70%] max-[600px]:w-[100%] relative z-0">
      <div className="w-full min-[768px]:w-[100%] bg-[#222222] min-[880px]:w-[98%] min-[912px]:w-[98%] lg:w-[100%] mb-2">
        <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px] p-2 mt-5 sm:mt-0">
          <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
            Series list
          </h3>
        </div>

        <Suspense fallback={<Loading />}>
          <Herobar />
          <Gridbar />
        </Suspense>
      </div>
    </div>
  );
}
