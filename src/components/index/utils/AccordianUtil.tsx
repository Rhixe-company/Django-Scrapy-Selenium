import React from "react";
import AccordianUtilItem from "@/components/index/utils/AccordianUtilItem";
const AccordianUtil = () => {
  return (
    <div className="mb-[18px] rounded-[3px] bg-[#222] min-[855px]:mr-3 lg:mr-0 lg:ml-[15px]">
      <div className="font-500 relative flex justify-between border-b-[1px] border-[#312f40] bg-[#222222] px-[15px] py-[8px] align-baseline">
        <h3 className="m-0 text-[15px] leading-5 font-semibold text-white">
          Popular
        </h3>
      </div>
      <div className="bg-[#222222]">
        <div>
          <div className="px-2.5 pt-[11px]">
            <div className="text-muted-foreground grid h-8 w-[100%] grid-cols-3 items-center justify-center rounded-[2px] bg-[#333] p-1 px-1.5">
              <button
                type="button"
                data-state="active"
                className="ring-offset-background focus-visible:ring-ring inline-flex h-[22px] items-center justify-center rounded-sm px-8 py-1.5 text-[12px] font-normal whitespace-nowrap text-white transition-all hover:text-[#913fe2] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#913fe2] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:hover:text-white"
              >
                Weekly
              </button>
              <button
                type="button"
                data-state="inactive"
                className="ring-offset-background focus-visible:ring-ring inline-flex h-[22px] items-center justify-center rounded-sm px-8 py-1.5 text-[12px] font-normal whitespace-nowrap text-white transition-all hover:text-[#913fe2] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#913fe2] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:hover:text-white"
              >
                Monthly
              </button>
              <button
                type="button"
                data-state="inactive"
                className="ring-offset-background focus-visible:ring-ring inline-flex h-[22px] items-center justify-center rounded-sm px-8 py-1.5 text-[12px] font-normal whitespace-nowrap text-white transition-all hover:text-[#913fe2] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#913fe2] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:hover:text-white"
              >
                All
              </button>
            </div>
          </div>
          <AccordianUtilItem />
        </div>
      </div>
    </div>
  );
};

export default AccordianUtil;
