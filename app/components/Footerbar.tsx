import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

const Footerbar = () => {
  return (
    <Fragment>
      <footer className="bg-[var(--foreground)] shadow-sm dark:bg-[var(--background)]">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
            >
              <Image
                className="logoimage size-8"
                src="/logo.webp"
                alt="logo"
                width={60}
                height={30}
              />
            </Link>
            <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="/home" className="me-4 hover:underline md:me-6">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="me-4 hover:underline md:me-6">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025
            <Link href="/" className="hover:underline">
              Comics™ .
            </Link>
            All Rights Reserved.
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footerbar;
