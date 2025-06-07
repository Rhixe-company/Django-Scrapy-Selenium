import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CarouselItembar() {
  return (
    <div className="overflow-hidden hidden min-[882px]:hidden min-[883px]:block">
      <div className="relative cursor-pointer h-[280px] ml-2.5">
        <Link href="#">
          <Image
            alt="Trending Crown"
            fetchPriority="high"
            loading="eager"
            width={100}
            height={100}
            decoding="async"
            data-nimg="1"
            style={{
              color: "transparent",
              top: "10px",
              right: "5px",
              position: "absolute",
              backgroundSize: "100px",
              zIndex: "1",
            }}
            src="/crown.webp"
          />

          <div className="absolute w-full h-full top-0 left-0 z-1 text-white myblack">
            <div className="mt-[40%] leading-[19px] text-left uppercase px-[5%] py-0">
              <span className="block text-[16px]">
                Asura Scans <b>Trending</b> This Week
              </span>
              <span className="block text-[17px] mt-[5px] h-[55px] overflow-hidden">
                <b>Revenge of the Iron-Blooded Sword Hound</b>
              </span>
            </div>
          </div>
          <div className="h-full w-full overflow-hidden bg-[auto 100%] bg-[top center] bg-black opacity-20">
            <div
              className="h-full w-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url(/01J7TV2G7719CVSTSW9T9M6F31-thumb-small.webp)",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
