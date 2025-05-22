import Rightbar from "@/app/components/base/Rightbar";
import Leftbar from "@/app/components/series/Leftbar";
import Loading from "./loading";
import { Suspense } from "react";
export default function Series() {
  return (
    <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
      <Suspense fallback={<Loading />}>
        <Leftbar />
      </Suspense>

      <Rightbar />
    </div>
  );
}
