"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import type { Comics } from "@/models/comics";

const CarouselItems = ({ comics }: { comics: Comics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const handlePrev = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + comics.length) % comics.length
    );
  };

  // Function to show the next slide
  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % comics.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);
  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="loop owl-carousel full owl-loaded"
    >
      <div>
        <div className="carousel-root">
          <div className="carousel carousel-slider" style={{ width: "100%" }}>
            <ul className="control-dots">
              {comics.map((_, index) => (
                <li
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={index === currentIndex ? `dot selected` : `dot`}
                  value={index}
                  role="button"
                  tabIndex={index}
                  aria-label={`slide item ${index + 1}`}
                ></li>
              ))}
            </ul>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="previous slide / item"
              className="control-arrow control-prev control-disabled"
            ></button>
            <div className="slider-wrapper axis-horizontal">
              <ul
                className="slider animated"
                style={
                  currentIndex > 0
                    ? {
                        transform: `translate3d(-${currentIndex}00%, 0px, 0px)`,
                        transitionDuration: "350ms",
                      }
                    : {
                        transform: `translate3d(-${currentIndex}%, 0px, 0px)`,
                        transitionDuration: "350ms",
                      }
                }
              >
                {comics.map((comic) => (
                  <li key={comic.slug} className="slide">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
                      <div className="h-[280px] relative select-none">
                        <div>
                          {comic.images[0].image ? (
                            <Image
                              src={`http://127.0.0.1:8000${comic.images[0].image}`}
                              alt={comic.title}
                              width={100}
                              height={100}
                              quality={100}
                              unoptimized
                              decoding="async"
                              loading="eager"
                              className="blur-lg brightness-[0.2]"
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                left: "0",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                objectFit: "cover",
                                color: "transparent",
                              }}
                            />
                          ) : (
                            <Image
                              src={`${comic.images[0].link}`}
                              alt={comic.title}
                              width={100}
                              height={100}
                              quality={100}
                              unoptimized
                              decoding="async"
                              loading="eager"
                              className="blur-lg brightness-[0.2]"
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                left: "0",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                objectFit: "cover",
                                color: "transparent",
                              }}
                            />
                          )}
                        </div>
                        <div className="relative grid grid-cols-12 slide-content">
                          <div className="col-span-9 sm:col-span-9 text-white pr-3.5 sm:pr-5">
                            <div className="info-left">
                              <div className="rating">
                                <div className="vote">
                                  <div className="site-vote">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 576 512"
                                      fill="#f3d872"
                                    >
                                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                    </svg>
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs italic text-[#0a0a0a]">
                                      {comic.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="ellipsis">
                                <span>
                                  <Link
                                    href={`/series/${comic.slug}`}
                                    className="hover:text-[#f3d872]"
                                  >
                                    {comic.title}
                                  </Link>
                                </span>
                                <br />
                                <span className="release-year">
                                  {comic.category.name}
                                </span>
                              </div>
                            </div>
                            <span className="block sm:hidden text-[12px] mt-[68px] extra-category">
                              {comic.genres.slice(0, 4).map((genre) => (
                                <Link
                                  key={genre.id}
                                  href={`/series/page=1&genres=${genre.id}`}
                                  className="text-white hover:text-themecolor cursor-pointer"
                                  style={{ marginBottom: "-10px" }}
                                >
                                  {genre.name},
                                </Link>
                              ))}

                              <Link
                                href="#"
                                className="text-white hover:text-themecolor cursor-pointer"
                                style={{ marginBottom: "-10px" }}
                              >
                                ...
                              </Link>
                            </span>
                            <span className="hidden sm:block text-[12px] mt-[68px] extra-category">
                              {comic.genres.slice(0, 4).map((genre) => (
                                <Link
                                  key={genre.id}
                                  href={`/series/page=1&genres=${genre.id}`}
                                  className="text-white hover:text-themecolor cursor-pointer"
                                  style={{ marginBottom: "-10px" }}
                                >
                                  {genre.name},
                                </Link>
                              ))}
                            </span>
                            <span className="block uppercase mt-2 title">
                              <strong>summary</strong>
                            </span>
                            <div className="text-left hidden sm:block mt-1 summary justify-between">
                              {comic.description.slice(0, 100)}
                            </div>
                            <div className="text-left sm:hidden mt-1 summary justify-between">
                              {comic.description.slice(0, 100)}
                            </div>
                            <span className="block text-[13px] mt-1">
                              Status: {comic.status}
                              <br />
                            </span>
                          </div>
                          <div className="col-span-3">
                            <Link href={`/series/${comic.slug}`}>
                              <div className="hidden sm:flex poster relative">
                                {comic.images[0].image ? (
                                  <Image
                                    src={`http://127.0.0.1:8000${comic.images[0].image}`}
                                    alt={comic.title}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                    decoding="async"
                                    loading="eager"
                                    className="rounded-[4px]"
                                    style={{
                                      color: "transparent",
                                      width: "100%",
                                      maxHeight: "180px",
                                      objectFit: "contain",
                                      objectPosition: "100% 15%",
                                    }}
                                  />
                                ) : (
                                  <Image
                                    src={`${comic.images[0].link}`}
                                    alt={comic.title}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                    decoding="async"
                                    loading="eager"
                                    className="rounded-[4px]"
                                    style={{
                                      color: "transparent",
                                      width: "100%",
                                      maxHeight: "180px",
                                      objectFit: "contain",
                                      objectPosition: "100% 15%",
                                    }}
                                  />
                                )}
                              </div>
                              <div className="sm:hidden relative">
                                {comic.images[0].image ? (
                                  <Image
                                    src={`http://127.0.0.1:8000${comic.images[0].image}`}
                                    alt={comic.title}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                    decoding="async"
                                    loading="eager"
                                    className="rounded-[4px]"
                                    style={{
                                      color: "transparent",
                                      width: "100%",
                                      maxHeight: "125px",
                                      objectFit: "cover",
                                      objectPosition: "100% 15%",
                                    }}
                                  />
                                ) : (
                                  <Image
                                    src={`${comic.images[0].link}`}
                                    alt={comic.title}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    unoptimized
                                    decoding="async"
                                    loading="eager"
                                    className="rounded-[4px]"
                                    style={{
                                      color: "transparent",
                                      width: "100%",
                                      maxHeight: "125px",
                                      objectFit: "cover",
                                      objectPosition: "100% 15%",
                                    }}
                                  />
                                )}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleNext}
              type="button"
              aria-label="next slide / item"
              className="control-arrow control-next control-disabled"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItems;
