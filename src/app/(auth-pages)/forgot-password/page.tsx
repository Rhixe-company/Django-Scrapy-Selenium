import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
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
        <p className="text-center mb-6 text-sm">Reset Password</p>
        <form>
          <div className="mb-4 relative">
            <Label htmlFor="email">Email</Label>
            <div className="space-y-2">
              <Input name="email" placeholder="you@example.com" required />
            </div>
          </div>

          <SubmitButton
            formAction={forgotPasswordAction}
            className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-md"
          >
            Reset Password
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
