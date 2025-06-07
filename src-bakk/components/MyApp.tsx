import Footerbar from "./base/Footerbar";
import Navbar from "./base/Navbar";
import Scrollbar from "./base/Scrollbar";
import { user } from "../types/UserData";
import { ThemeProvider } from "next-themes";
import React from "react";
export default async function MyApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar user={user} />
      <div className="max-w-[1220px] pt-2 overflow-hidden m-auto relative pb-[9rem]">
        <div className="w-[100%]">
          <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
            {children}
          </div>
        </div>
      </div>
      <Scrollbar />
      <Footerbar />
    </ThemeProvider>
  );
}
