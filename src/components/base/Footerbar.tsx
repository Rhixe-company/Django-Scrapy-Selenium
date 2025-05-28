import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";
import Link from "next/link";
export default function Footerbar() {
  return (
    <div
      className="bottom-[-40px] sm:bottom-0"
      style={{ position: "absolute", width: "100%" }}
    >
      <footer>
        <div className="border-gray-200 h-18 bg-themecolor text-center">
          <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
            <Link href="/privacy-policy">
              <span className="text-white text-[13px] sm:text-sm">
                Privacy Policy
              </span>
            </Link>
          </div>
          <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
            <Link href="/dmca">
              <span className="text-white text-[13px] sm:text-sm">
                Digital Millennium Copyright Act
              </span>
            </Link>
          </div>
          <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
            <Link href="/terms-of-service">
              <span className="text-white text-[13px] sm:text-sm">
                Terms of Service
              </span>
            </Link>
          </div>
          <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
            <ThemeSwitcher />
          </div>
        </div>
        <div className="flex justify-center items-center border-gray-200 h-24 bg-[#222222]">
          <span className="mr-0 h-10 w-10 sm:h-12 sm:w-12">
            <Link href="/">
              <Image
                className="object-cover logoimage"
                src="/logo.webp"
                alt="Rhixe logo"
                width={100}
                height={100}
                loading="lazy"
                decoding="async"
                data-nimg="1"
                style={{
                  color: "transparent",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
