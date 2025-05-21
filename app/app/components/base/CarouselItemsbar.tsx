import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CarouselItemsbar() {
  return (
    <div className="loop owl-carousel full owl-loaded">
      <div>
        <div className="carousel-root">
          <div className="carousel carousel-slider" style={{ width: "100%" }}>
            <ul className="control-dots">
              <li
                className="dot selected"
                value="0"
                role="button"
                tabIndex={0}
                aria-label="slide item 1"
              ></li>
              <li
                className="dot"
                value="0"
                role="button"
                tabIndex={0}
                aria-label="slide item 1"
              ></li>
            </ul>
            <button
              type="button"
              aria-label="previous slide / item"
              className="control-arrow control-prev control-disabled"
            ></button>
            <div className="slider-wrapper axis-horizontal">
              <ul
                className="slider animated"
                style={{
                  transform: "translate3d(-0%, 0px, 0px)",
                  transitionDuration: "350ms",
                }}
              >
                <li className="slide">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
                    <div className="h-[280px] relative select-none">
                      <div>
                        <Image
                          alt="poster"
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                          data-nimg="fill"
                          className="blur-lg brightness-[0.2]"
                          width={100}
                          height={100}
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
                          src="/01J6AR9XJKAQHET3AJYG9YPZ57-thumb-small.webp"
                        />
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
                                    9.9
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ellipsis">
                              <span>
                                <Link
                                  href="/series/childhood-friend-of-the-zenith-4539df71"
                                  className="hover:text-[#f3d872]"
                                >
                                  Childhood Friend of the Zenith
                                </Link>
                              </span>
                              <br />
                              <span className="release-year">Manhwa</span>
                            </div>
                          </div>
                          <span className="block sm:hidden text-[12px] mt-[68px] extra-category">
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Action,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Fantasy,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Martial Arts,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Wuxi,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              ...
                            </Link>
                          </span>
                          <span className="hidden sm:block text-[12px] mt-[68px] extra-category">
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Action,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Fantasy,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Martial Arts,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Wuxia
                            </Link>
                          </span>
                          <span className="block uppercase mt-2 title">
                            <strong>summary</strong>
                          </span>
                          <div className="text-left hidden sm:block mt-1 summary justify-between">
                            Gu Yangchun, who betrayed the Orthodox sects, became
                            a demonic human under the Heavenly Demon.Living as a
                            demo...
                          </div>
                          <div className="text-left sm:hidden mt-1 summary justify-between">
                            Gu Yangchun, who betrayed the Orthodox sects, became
                            a demonic human u...
                          </div>
                          <span className="block text-[13px] mt-1">
                            Status: Ongoing
                            <br />
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Link href="/series/childhood-friend-of-the-zenith-4539df71">
                            <div className="hidden sm:flex poster relative">
                              <Image
                                alt="poster"
                                loading="lazy"
                                width={100}
                                height={100}
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "180px",
                                  objectFit: "contain",
                                  objectPosition: "100% 15%",
                                }}
                                src="/01J6AR9XJKAQHET3AJYG9YPZ57-thumb-small.webp"
                              />
                            </div>
                            <div className="sm:hidden relative">
                              <Image
                                alt="poster"
                                loading="lazy"
                                width={100}
                                height={100}
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "125px",
                                  objectFit: "cover",
                                  objectPosition: "100% 15%",
                                }}
                                src="/01J6AR9XJKAQHET3AJYG9YPZ57-thumb-small.webp"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="slide">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
                    <div className="h-[280px] relative select-none">
                      <div>
                        <Image
                          alt="poster"
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                          data-nimg="fill"
                          className="blur-lg brightness-[0.2]"
                          width={100}
                          height={100}
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
                          src="/01JKEJ2C9APTHCEM3MV31MZM98-thumb-small.webp"
                        />
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
                                    9.7
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ellipsis">
                              <span>
                                <Link
                                  href="/series/genius-prismatic-mage-c7b7ab13"
                                  className="hover:text-[#f3d872]"
                                >
                                  Genius Prismatic Mage
                                </Link>
                              </span>
                              <br />
                              <span className="release-year">Manhwa</span>
                            </div>
                          </div>
                          <span className="block sm:hidden text-[12px] mt-[68px] extra-category">
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Action,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Fantasy,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Martial Arts,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Wuxi,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              ...
                            </Link>
                          </span>
                          <span className="hidden sm:block text-[12px] mt-[68px] extra-category">
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Action,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Fantasy,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Martial Arts,
                            </Link>
                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer"
                              style={{ marginBottom: "-10px" }}
                            >
                              Wuxia
                            </Link>
                          </span>
                          <span className="block uppercase mt-2 title">
                            <strong>summary</strong>
                          </span>
                          <div className="text-left hidden sm:block mt-1 summary justify-between">
                            Gu Yangchun, who betrayed the Orthodox sects, became
                            a demonic human under the Heavenly Demon.Living as a
                            demo...
                          </div>
                          <div className="text-left sm:hidden mt-1 summary justify-between">
                            Gu Yangchun, who betrayed the Orthodox sects, became
                            a demonic human u...
                          </div>
                          <span className="block text-[13px] mt-1">
                            Status: Ongoing
                            <br />
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Link href="/series/childhood-friend-of-the-zenith-4539df71">
                            <div className="hidden sm:flex poster relative">
                              <Image
                                alt="poster"
                                loading="lazy"
                                width={100}
                                height={100}
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "180px",
                                  objectFit: "contain",
                                  objectPosition: "100% 15%",
                                }}
                                src="/01JKEJ2C9APTHCEM3MV31MZM98-thumb-small.webp"
                              />
                            </div>
                            <div className="sm:hidden relative">
                              <Image
                                alt="poster"
                                loading="lazy"
                                width={100}
                                height={100}
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "125px",
                                  objectFit: "cover",
                                  objectPosition: "100% 15%",
                                }}
                                src="/01JKEJ2C9APTHCEM3MV31MZM98-thumb-small.webp"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <button
              type="button"
              aria-label="next slide / item"
              className="control-arrow control-next control-disabled"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
