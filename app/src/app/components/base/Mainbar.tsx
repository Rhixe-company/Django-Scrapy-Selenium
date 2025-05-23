import Navbar from "@/app/components/base/Navbar";
import Scrollbar from "@/app/components/base/Scrollbar";
import Footerbar from "@/app/components/base/Footerbar";

import { Fragment, ReactNode } from "react";
export default function Mainbar({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      <div
        className="max-w-[1220px] pt-2"
        style={{ overflow: "hidden", margin: "0 auto", paddingBottom: "9rem" }}
      >
        <div className="">
          <div className="w-[100%]">
            <div
              style={{
                overflow: "hidden",
                maxWidth: "1220px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scrollbar />
      <Footerbar />
    </Fragment>
  );
}
