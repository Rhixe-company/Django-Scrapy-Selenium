import React from "react";
import Link from "next/link";
import Image from "next/image";

const GridUtilItem = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 bg-[#222222] p-3 pb-0 sm:grid-cols-2">
      <div className="w-full border-b-[1px] border-b-[#312f40] p-1 pt-1 pb-3">
        <div className="m-2 grid grid-cols-12 grid-rows-1">
          <div className="col-span-3">
            <div className="relative h-32 w-[100%]">
              <Link href="#">
                <Image
                  alt="poster"
                  width={100}
                  height={100}
                  priority
                  className="gridUtil_image rounded-md object-cover"
                  src="/testcomic.webp"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-9 space-y-1.5 overflow-hidden pl-[9px]">
            <span className="text-[15px] font-medium hover:cursor-pointer hover:text-[#913fe2]">
              <Link href="#">Fated To be Loved By Villans</Link>
            </span>
            <div className="flex list-disc flex-col gap-y-1.5">
              <span className="mt-1 inline-block flex-1">
                <div className="flex flex-row justify-between rounded-sm">
                  <div className="flex text-sm font-medium text-[#999] hover:text-white">
                    <Link href="#" className="">
                      <span className="flex">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-[2px] text-[#9d4942]"
                        >
                          <path
                            d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <div className="flex gap-1">
                          <p className="w-[80px]">Chapter 1</p>
                        </div>
                      </span>
                    </Link>
                  </div>
                  <p className="ml-2 flex items-end text-[12px] text-[#555555]">
                    2 days ago
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-b-[1px] border-b-[#312f40] p-1 pt-1 pb-3">
        <div className="m-2 grid grid-cols-12 grid-rows-1">
          <div className="col-span-3">
            <div className="relative h-32 w-[100%]">
              <Link href="#">
                <Image
                  alt="poster"
                  width={100}
                  height={100}
                  priority
                  className="gridUtil_image rounded-md object-cover"
                  src="/testcomic2.webp"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-9 space-y-1.5 overflow-hidden pl-[9px]">
            <span className="text-[15px] font-medium hover:cursor-pointer hover:text-[#913fe2]">
              <Link href="#">ChildHood Friend of The Zenith</Link>
            </span>
            <div className="flex list-disc flex-col gap-y-1.5">
              <span className="mt-1 inline-block flex-1">
                <div className="flex flex-row justify-between rounded-sm">
                  <div className="flex text-sm font-medium text-[#999] hover:text-white">
                    <Link href="#" className="">
                      <span className="flex">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-[2px] text-[#9d4942]"
                        >
                          <path
                            d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <div className="flex gap-1">
                          <p className="w-[80px]">Chapter 5</p>
                        </div>
                      </span>
                    </Link>
                  </div>
                  <p className="ml-2 flex items-end text-[12px] text-[#555555]">
                    6 days ago
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridUtilItem;
