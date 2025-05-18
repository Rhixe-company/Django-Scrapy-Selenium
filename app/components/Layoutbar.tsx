import React from "react";
import Footerbar from "@/components/Footerbar";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";
import { Fira_Sans, Fira_Mono } from "next/font/google";

interface Props {
  readonly children: ReactNode;
}

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Layoutbar = ({ children }: Props) => {
  return (
    <section className={`${firaSans.variable} content`}>
      <Navbar />
      <main className="m-4 rounded-lg bg-[var(--background)] shadow-sm dark:bg-[var(--foreground)]">
        {children}
      </main>

      <Footerbar />
    </section>
  );
};

export default Layoutbar;
