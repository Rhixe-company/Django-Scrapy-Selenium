import Navbar from "@/app/components/base/Navbar";
import Scrollbar from "@/app/components/base/Scrollbar";
import Footerbar from "@/app/components/base/Footerbar";
import { Fragment } from "react";
export default function Bookmarks() {
  return (
    <Fragment>
      <Navbar />
      <div className="max-w-[1220px] pt-2 overflow-hidden  m-auto pb-[9rem]">
        <div className="w-[100%]">
          <div className="max-w-[1220px]  overflow-hidden  m-auto relative">
            <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
              <h2>Bookmarks</h2>
            </div>
          </div>
        </div>
      </div>
      <Scrollbar />
      <Footerbar />
    </Fragment>
  );
}
