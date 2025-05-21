import Mainbar from "@/app/components/base/Mainbar";
import { Fira_Sans } from "next/font/google";
import "./styles/globals.css";
import React from "react";
import StoreProvider from "./StoreProvider";
const firaSans = Fira_Sans({
  // variable: "font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en" className={`${firaSans.className} dark`}>
        <body className={`${firaSans.className}  min-h-screen antialiased`}>
          <Mainbar>{children}</Mainbar>
        </body>
      </html>
    </StoreProvider>
  );
}
