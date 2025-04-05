import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bottom-[-40px] sm:bottom-0">
      <footer>
        <div className="h-18 border-gray-200 bg-[#913fe2] text-center">
          <div className="hover:bg-opacity-40 inline-block items-center px-3 py-1.5 hover:cursor-pointer hover:bg-gray-900">
            <Link href="/">
              <span className="text-[13px] text-white sm:text-sm">
                Privacy Policy
              </span>
            </Link>
          </div>
          <div className="hover:bg-opacity-40 inline-block items-center px-3 py-1.5 hover:cursor-pointer hover:bg-gray-900">
            <Link href="/">
              <span className="text-[13px] text-white sm:text-sm">
                Digital Millennium Copyright Act
              </span>
            </Link>
          </div>
          <div className="hover:bg-opacity-40 inline-block items-center px-3 py-1.5 hover:cursor-pointer hover:bg-gray-900">
            <Link href="/">
              <span className="text-[13px] text-white sm:text-sm">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
        <div className="flex h-24 items-center justify-center border-gray-200 bg-[#222222]">
          <span className="mr-0 h-10 w-10 sm:h-12 sm:w-12">
            <Link href="/">
              <Image
                width={40}
                height={40}
                className="object-cover"
                src="/logo.webp"
                alt="RhixeScans logo"
                priority
              />
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
