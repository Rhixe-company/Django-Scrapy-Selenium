import React from "react";

import GridUtil from "@/components/series/utils/GridUtil";
const LeftContent = () => {
  return (
    <div className="float-left w-[100%] max-[600px]:w-[100%] min-[882px]:w-[70%]">
      <div className="flex h-full min-h-72 justify-center">
        <div className="w-[100%] min-[768px]:w-[100%] min-[880px]:w-[95%] min-[912px]:w-[96%] lg:w-[100%]">
          <GridUtil />
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
