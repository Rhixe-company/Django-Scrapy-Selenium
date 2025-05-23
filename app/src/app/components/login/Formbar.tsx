"use client";
import React, { useState } from "react";
import Link from "next/link";

interface PageProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    remember: boolean
  ) => void;
}

const Formbar: React.FC<PageProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  return (
    <form onSubmit={(e) => handleSubmit(e, email, password, remember)}>
      <div className="mb-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-4 absolute left-3 top-6 transform -translate-y-1/2 mr-10"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
        </svg>
        <div className="space-y-2">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full p-6 pl-10 bg-secondarybackground text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your Email"
            required
          />
        </div>
      </div>
      <div className="mb-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="absolute size-4 left-3 top-6 transform -translate-y-1/2 mr-10"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="space-y-2">
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full p-6 pl-10 bg-secondarybackground text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="Password"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="cursor-pointer size-4 absolute right-3 top-4 transform -translate-y-1/2"
          >
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"></path>
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"></path>
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"></path>
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center">
            {remember ? (
              <button
                type="button"
                role="checkbox"
                aria-checked="true"
                data-state="checked"
                onClick={() => setRemember(false)}
                className="peer shrink-0 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded border-gray-300 text-indigo-600 shadow-sm size-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <span
                  data-state="checked"
                  className="flex items-center justify-center text-current"
                  style={{ pointerEvents: "none" }}
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
                    className="lucide lucide-check h-4 w-4"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                onClick={() => setRemember(true)}
                className="peer shrink-0 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded border-gray-300 text-indigo-600 shadow-sm size-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></button>
            )}

            <input
              type="checkbox"
              name="remember"
              aria-hidden="true"
              tabIndex={-1}
              style={{
                transform: "translateX(-100%)",
                position: "absolute",
                pointerEvents: "none",
                opacity: "0",
                margin: "0px",
                width: "16px",
                height: "16px",
              }}
            />
            <span className="ml-2 text-xs font-semibold pt-[-300px]">
              Remember me
            </span>
          </div>
        </div>
        <Link
          href="/reset-password"
          className="hover:underline text-xs font-semibold cursor-pointer"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-md"
      >
        Login
      </button>
    </form>
  );
};

export default Formbar;
