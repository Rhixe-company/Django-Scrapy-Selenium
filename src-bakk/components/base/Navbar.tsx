"use client";
import { signOutAction } from "../../app/actions";
import Searchbar from "./Searchbar";

import type { UserType } from "../../types/UserType";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
export default function Navbar({ user }: { user: UserType }) {
  return (
    <Disclosure as="header" className="bg-themecolor py-1">
      <div className="max-w-[1220px] flex mx-auto px-2 items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex h-12 w-12">
            <Image
              className="object-cover logoimage"
              src="/logo.webp"
              alt="Rhixe logo"
              width={100}
              height={100}
            />
          </Link>
          <ul className="hidden md:flex flex-row">
            <li>
              <Link href="/">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Bookmarks
                </span>
              </Link>
            </li>
            <li>
              <Link href="/series?page=1">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Comics
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full">
          <div className="flex-row w-full gap-3.5 items-center">
            <div className="hidden md:flex flex-row w-full gap-3.5 items-center">
              <div className="hidden md:flex justify-end items-center w-full">
                <input
                  type="text"
                  className="relative w-[95%] sm:w-[55%] md:w-[55%] lg:w-[40%] text-white px-4 py-1 sm:py-2 rounded-lg border-[1px] bg-[#16151D] border-black outline-none"
                  placeholder="Search"
                />
                <svg
                  className="h-8 w-8 absolute pt-1 text-white cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              {user?.email ? (
                <Menu as="div" style={{ opacity: 1 }}>
                  <div className="hidden md:flex flex-row items-center gap-3.5">
                    <MenuButton className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 hover:bg-purple-800/50 rounded-full">
                      <Image
                        src="/profile-picture.webp"
                        alt="User"
                        className="h-8 w-8 rounded-full ring-2 ring-purple-400/20"
                        width={100}
                        height={100}
                      />
                    </MenuButton>
                  </div>
                  <AnimatePresence>
                    <MenuItems
                      as={motion.div}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition
                      className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 right-16 z-50 w-[200px] min-w-[8rem] overflow-hidden rounded-md border border-purple-500/20 bg-[#1a1a1a] p-1 text-white shadow-lg shadow-purple-500/10"
                      style={{
                        position: "absolute",
                        top: "40px",
                        width: "24px",
                        overflow: "auto",
                        maxWidth: "919px",
                        maxHeight:
                          "min(var(--anchor-max-height, 100vh), 611px)",
                      }}
                    >
                      <div className="p-2">
                        <MenuItem>
                          <div className="relative flex cursor-default select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-sm outline-none transition-colors focus:bg-purple-500/20 focus:text-white data-disabled:pointer-events-none data-disabled:opacity-50">
                            <Link
                              className="inline-flex gap-2.5"
                              href="/protected"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-settings h-4 w-4"
                              >
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Settings
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <div className="relative flex cursor-default select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-red-500 outline-none transition-colors focus:bg-red-500/10 focus:text-red-500 data-disabled:pointer-events-none data-disabled:opacity-50">
                            <form action={signOutAction}>
                              <button
                                type="submit"
                                className="inline-flex gap-2.5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-log-out h-4 w-4"
                                >
                                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                  <polyline points="16 17 21 12 16 7"></polyline>
                                  <line x1="21" x2="9" y1="12" y2="12"></line>
                                </svg>
                                Log out
                              </button>
                            </form>
                          </div>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </AnimatePresence>
                </Menu>
              ) : (
                <div style={{ width: "auto" }}>
                  <Link
                    className="rounded-full flex items-center justify-center bg-[#121212]"
                    href="/sign-in"
                  >
                    <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-round w-3 h-3"
                      >
                        <circle cx="12" cy="8" r="5"></circle>
                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                      </svg>
                      <p>Login</p>
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex md:hidden flex-row gap3.5 items-center">
              <div className="flex flex-row flex-grow items-center justify-end space-x-1">
                <Searchbar />

                {!user?.email && (
                  <div style={{ width: "auto" }}>
                    <Link
                      className="rounded-full flex items-center justify-center bg-[#121212]"
                      href="/sign-in"
                    >
                      <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-round w-3 h-3"
                        >
                          <circle cx="12" cy="8" r="5"></circle>
                          <path d="M20 21a8 8 0 0 0-16 0"></path>
                        </svg>
                        <p>Login</p>
                      </button>
                    </Link>
                  </div>
                )}

                <div className="block md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-menu h-5 w-5"
                    >
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisclosurePanel className="md:hidden">
        <div
          className="fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-open:animate-in data-closed:animate-out data-closed:duration-300 data-open:duration-500 inset-y-0 right-0 h-full data-closed:slide-out-to-right data-open:slide-in-from-right sm:max-w-sm w-full max-w-xs border-l-0 bg-gradient-to-b from-[#1a1a1a] to-purple-900 p-0"
          tabIndex={-1}
          style={{ pointerEvents: "auto" }}
        >
          {user?.email ? (
            <div className="flex flex-col h-full">
              <div className="border-b border-white/10 bg-[#7E22CE] p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    width={100}
                    height={100}
                    src="/profile-picture.webp"
                    alt="rhixebot"
                    className="h-12 w-12 rounded-full border-2 border-white/20"
                  />
                  <div className="space-y-1">
                    <h2 className="text-base font-medium text-white">
                      username
                    </h2>
                    <p className="text-sm text-white/70">{user?.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1 p-4">
                <Link
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-house h-5 w-5"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span>Home</span>
                </Link>
                <Link
                  href="/series"
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-library h-5 w-5"
                  >
                    <path d="m16 6 4 14"></path>
                    <path d="M12 6v14"></path>
                    <path d="M8 8v12"></path>
                    <path d="M4 4v16"></path>
                  </svg>
                  <span>Comics</span>
                </Link>
                <Link
                  href="/bookmarks"
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark h-5 w-5"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                  <span>Bookmarks</span>
                </Link>
                <button
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full justify-start space-x-2 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-600 text-white font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up h-5 w-5 animate-bounce"
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                  <span>Upgrade Now</span>
                </button>
              </div>
              <div className="border-t border-white/10 p-4">
                <button
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                >
                  <Link href="/protected" className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-settings h-5 w-5"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Settings</span>
                  </Link>
                </button>
                <form action={signOutAction}>
                  <button
                    className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-red-500 hover:bg-white/10"
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-log-out h-5 w-5"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                    <span>Log out</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-1 p-4">
                <Link
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-house h-5 w-5"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span>Home</span>
                </Link>
                <Link
                  href="/series"
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-library h-5 w-5"
                  >
                    <path d="m16 6 4 14"></path>
                    <path d="M12 6v14"></path>
                    <path d="M8 8v12"></path>
                    <path d="M4 4v16"></path>
                  </svg>
                  <span>Comics</span>
                </Link>
                <Link
                  href="/bookmarks"
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark h-5 w-5"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                  <span>Bookmarks</span>
                </Link>
              </div>
              <div className="border-t border-white/10 p-4">
                <button
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10"
                  type="button"
                >
                  <Link href="/sign-in" className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-log-in h-5 w-5"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" x2="3" y1="12" y2="12"></line>
                    </svg>
                    <span>Login</span>
                  </Link>
                </button>
              </div>
            </div>
          )}

          <DisclosureButton
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x h-4 w-4"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            <span className="sr-only">Close</span>
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
