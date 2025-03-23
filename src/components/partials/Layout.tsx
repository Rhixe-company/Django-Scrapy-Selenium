import React from "react";
import styles from "@/styles/layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Header />
      <div className={`${styles.appContainer} max-w-[1220px] pt-2`}>
        <div>
          <div className="w-[100%]">
            <div className={`${styles.appWrapper}`}>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
