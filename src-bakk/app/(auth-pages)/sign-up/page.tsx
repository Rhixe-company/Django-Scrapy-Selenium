import { signUpAction } from "../../actions";
import { FormMessage, Message } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button";
import { Input } from "../../../components/ui/input";

import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#222222] p-8 rounded-lg shadow-md w-full  sm:max-w-[500px]">
        <div className="flex justify-center mb-1">
          <img
            alt="Rhixe Scans"
            loading="lazy"
            width="96"
            height="96"
            decoding="async"
            data-nimg="1"
            src="/logo.webp"
            style={{ color: "transparent" }}
          />
        </div>
        <h2 className="text-xl font-bold text-center text-white mb-1">
          Rhixe Scans
        </h2>
        <p className="text-center mb-6 text-sm">Register your account</p>
        <form>
          <div className="mb-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="absolute left-3 top-6 transform -translate-y-1/2 size-4  mr-10"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="space-y-2">
              <Input name="username" placeholder="Username" required />
            </div>
          </div>
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
              <Input name="email" placeholder="Enter your Email" required />
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
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
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
              <Input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirm"
                required
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

          <SubmitButton
            pendingText="Signing up..."
            formAction={signUpAction}
            className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-md"
          >
            Register
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
        <div className="text-center text-xs text-gray-400 mt-4">
          Already have Account?{" "}
          <Link
            className="text-white text-xs font-semibold hover:underline"
            href="/sign-in"
          >
            Login
          </Link>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-[#35383F]"></div>
          <span className="mx-2 font-semibold text-sm">Or continue with</span>
          <div className="flex-grow border-t border-[#35383F]"></div>
        </div>
        <div className="flex flex-row justify-center space-y-4 bg-secondarybackground p-2 border-[2px] border-[#121212] rounded-[18px] cursor-pointer">
          <div className="flex items-center justify-center  w-96 h-10 rounded-full">
            <img
              alt="Google"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              className="h-6 w-6 mr-3"
              src="/google.webp"
              style={{ color: "transparent" }}
            />
            Continue with Google
          </div>
        </div>
      </div>
    </>
  );
}
