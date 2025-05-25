import Rightbar from "@/app/components/base/Rightbar";
import Leftbar from "@/app/components/base/Leftbar";

export default function Home() {
  return (
    <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
      <Leftbar />
      <Rightbar />
    </div>
  );
}
