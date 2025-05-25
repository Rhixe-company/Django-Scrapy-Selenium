"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ComicsSelect } from "@/models/comics";
import CustomRating from "@/app/components/base/CustomRating";
const Accordianbar = ({ comics }: { comics: ComicsSelect }) => {
  const [currentAccord, setCurrentAccord] = useState("weekly");
  return (
    <div dir="ltr" data-orientation="horizontal">
      <div className="px-2.5 pt-[11px]">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="items-center p-1 text-muted-foreground grid w-[100%] px-1.5 grid-cols-3 h-8 rounded-[2px] justify-center bg-[#333]"
          tabIndex={0}
          data-orientation="horizontal"
          style={{ outline: "none" }}
        >
          <button
            type="button"
            role="tab"
            onClick={() => setCurrentAccord("weekly")}
            aria-selected={currentAccord === "weekly" ? "true" : "false"}
            aria-controls="content-weekly"
            data-state={currentAccord === "weekly" ? "active" : "inactive"}
            id="trigger-weekly"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            Weekly
          </button>
          <button
            type="button"
            role="tab"
            onClick={() => setCurrentAccord("monthly")}
            aria-selected={currentAccord === "monthly" ? "true" : "false"}
            aria-controls="content-monthly"
            data-state={currentAccord === "monthly" ? "active" : "inactive"}
            id="trigger-monthly"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            onClick={() => setCurrentAccord("all")}
            aria-selected={currentAccord === "all" ? "true" : "false"}
            aria-controls="content-all"
            data-state={currentAccord === "all" ? "active" : "inactive"}
            id="trigger-all"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            tabIndex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            All
          </button>
        </div>
      </div>
      {currentAccord == "weekly" && (
        <>
          <div>
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-weekly"
              id="content-weekly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ animationDuration: "0s" }}
            >
              <div>
                {comics.weeklycomics.map((item, index: number) => (
                  <div
                    key={item.slug}
                    className="flex px-[15px] py-3 overflow-hidden h-[104px] relative border-b border-[#383838]"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[25px] w-[25px] text-center leading-[25px] text-[14px] text-[#888] absolute vertical-middle ml-[25px] rounded-[3px] border-solid border-[0.5px] border-[#888]">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex overflow-hidden mt-0.5 mb-2.5 ml-[37px] mr-2 float-left max-w-[55px] h-[72px] max-h-[80px] rounded-[3px]">
                      <Link
                        href={`/comic/${item.slug}`}
                        className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
                      >
                        {item.images[0].image ? (
                          <Image
                            src={`http://127.0.0.1:8000${item.images[0].image}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        ) : (
                          <Image
                            src={`${item.images[0].link}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="w-full p-0 overflow-hidden">
                      <span className="block">
                        <Link
                          href={`/comic/${item.slug}`}
                          className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
                        >
                          {item.title}
                        </Link>
                      </span>
                      <span>
                        <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 3).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <span>
                        <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 2).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <div className="mt-[-2px]">
                        <div className="overflow-hidden">
                          <div className="float-left">
                            <div className="overflow-hidden inline-block mb-[-1px]">
                              <CustomRating rating={Number(item.rating)} />
                            </div>
                          </div>
                          <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-monthly"
              hidden
              id="content-monthly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ></div>
          </div>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-all"
              hidden
              id="content-all"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ></div>
          </div>
        </>
      )}
      {currentAccord == "monthly" && (
        <>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              hidden
              aria-labelledby="trigger-weekly"
              id="content-weekly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ animationDuration: "0s" }}
            ></div>
          </div>
          <div>
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-monthly"
              id="content-monthly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div>
                {comics.monthlycomics.map((item, index: number) => (
                  <div
                    key={item.slug}
                    className="flex px-[15px] py-3 overflow-hidden h-[104px] relative border-b border-[#383838]"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[25px] w-[25px] text-center leading-[25px] text-[14px] text-[#888] absolute vertical-middle ml-[25px] rounded-[3px] border-solid border-[0.5px] border-[#888]">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex overflow-hidden mt-0.5 mb-2.5 ml-[37px] mr-2 float-left max-w-[55px] h-[72px] max-h-[80px] rounded-[3px]">
                      <Link
                        href={`/comic/${item.slug}`}
                        className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
                      >
                        {item.images[0].image ? (
                          <Image
                            src={`http://127.0.0.1:8000${item.images[0].image}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        ) : (
                          <Image
                            src={`${item.images[0].link}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="w-full p-0 overflow-hidden">
                      <span className="block">
                        <Link
                          href={`/comic/${item.slug}`}
                          className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
                        >
                          {item.title}
                        </Link>
                      </span>
                      <span>
                        <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 3).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <span>
                        <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 2).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <div className="mt-[-2px]">
                        <div className="overflow-hidden">
                          <div className="float-left">
                            <div className="overflow-hidden inline-block mb-[-1px]">
                              <CustomRating rating={Number(item.rating)} />
                            </div>
                          </div>
                          <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-all"
              hidden
              id="content-all"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ></div>
          </div>
        </>
      )}
      {currentAccord == "all" && (
        <>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              hidden
              aria-labelledby="trigger-weekly"
              id="content-weekly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ animationDuration: "0s" }}
            ></div>
          </div>
          <div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-monthly"
              hidden
              id="content-monthly"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ></div>
          </div>
          <div>
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="trigger-all"
              id="content-all"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div>
                {comics.allcomics.map((item, index: number) => (
                  <div
                    key={item.slug}
                    className="flex px-[15px] py-3 overflow-hidden h-[104px] relative border-b border-[#383838]"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[25px] w-[25px] text-center leading-[25px] text-[14px] text-[#888] absolute vertical-middle ml-[25px] rounded-[3px] border-solid border-[0.5px] border-[#888]">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex overflow-hidden mt-0.5 mb-2.5 ml-[37px] mr-2 float-left max-w-[55px] h-[72px] max-h-[80px] rounded-[3px]">
                      <Link
                        href={`/comic/${item.slug}`}
                        className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
                      >
                        {item.images[0].image ? (
                          <Image
                            src={`http://127.0.0.1:8000${item.images[0].image}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        ) : (
                          <Image
                            src={`${item.images[0].link}`}
                            alt={item.title}
                            width={100}
                            height={100}
                            quality={100}
                            unoptimized
                            decoding="async"
                            loading="eager"
                            className="w-full cursor-pointer"
                            style={{
                              color: "transparent",
                              width: "100px",
                              height: "auto",
                              maxHeight: "110px",
                            }}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="w-full p-0 overflow-hidden">
                      <span className="block">
                        <Link
                          href={`/comic/${item.slug}`}
                          className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
                        >
                          {item.title}
                        </Link>
                      </span>
                      <span>
                        <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 3).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <span>
                        <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                          <b>Genres:</b>
                          {item.genres.slice(0, 2).map((genre) => (
                            <Link
                              key={genre.id}
                              href={`/series/${genre.name}`}
                              className="text-white hover:text-themecolor cursor-pointer"
                            >
                              {genre.name},
                            </Link>
                          ))}
                        </p>
                      </span>
                      <div className="mt-[-2px]">
                        <div className="overflow-hidden">
                          <div className="float-left">
                            <div className="overflow-hidden inline-block mb-[-1px]">
                              <CustomRating rating={Number(item.rating)} />
                            </div>
                          </div>
                          <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Accordianbar;
