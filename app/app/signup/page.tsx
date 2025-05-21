import Formbar from "@/app/components/signup/Formbar";
import Image from "next/image";
import Link from "next/link";
export default function Register() {
  return (
    <div className="flex justify-center h-full sm:mt-6 xl:mt-[-15px]">
      <div className="bg-[#222222] p-8 rounded-lg shadow-md w-full md:w-[500px]">
        <div className="flex justify-center mb-1">
          <Image
            alt="Rhixe Scans"
            priority={true}
            width={96}
            height={96}
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
        <Formbar />
        <div className="text-center text-xs text-gray-400 mt-4">
          Already have Account?
          <Link
            className="text-white text-xs font-semibold hover:underline"
            href="/login"
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
          <div className="flex items-center justify-center w-96 h-10 rounded-full">
            <Image
              alt="Google"
              priority={true}
              width={6}
              height={6}
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
    </div>
  );
}
