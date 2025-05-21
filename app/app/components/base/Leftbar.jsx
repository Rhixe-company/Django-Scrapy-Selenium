import React from "react";
import Carouselsbar from "@/app/components/base/Carouselsbar";
import Herobar from "@/app/components/base/Herobar";
import Gridbar from "@/app/components/base/Gridbar";
export default function Leftbar() {
  return (
    <div className="w-[100%] float-left min-[882px]:w-[70%] max-[600px]:w-[100%]">
      <div className="flex justify-center h-full min-h-72">
        <div className="w-[100%] min-[768px]:w-[100%] min-[880px]:w-[95%] min-[912px]:w-[96%] lg:w-[100%]">
          <Carouselsbar />
          <Herobar />
          <Gridbar />
        </div>
      </div>
    </div>
  );
}
