import Footerbar from "@/components/base/Footerbar";
import Navbar from "@/components/base/Navbar";
import Scrollbar from "@/components/base/Scrollbar";
import { ThemeProvider } from "next-themes";
import React from "react";
export default function MyApp({
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
      <Navbar />
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
