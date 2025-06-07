import Carouselsbar from "./Carouselsbar";
import Gridbar from "./Gridbar";
import Herobar from "./Herobar";

export default function Leftbar() {
  return (
    <div className="w-[100%] float-left min-[882px]:w-[70%] max-[600px]:w-[100%]">
      <div className="flex justify-center h-full min-h-72">
        <div className="w-[100%] min-[768px]:w-[100%] min-[880px]:w-[95%] min-[912px]:w-[96%] lg:w-[100%]">
          <Carouselsbar />
          <Herobar />
          <Gridbar />
        </div>
      </div>
    </div>
  );
}
