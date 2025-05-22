import "./styles/globals.css";
import { Fira_Sans } from "next/font/google";
import Mainbar from "@/app/components/base/Mainbar";
export const dynamic = "force-dynamic";

const firaSans = Fira_Sans({
  // variable: "font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${firaSans.className} dark`}>
      <body className={`${firaSans.className}  min-h-screen antialiased`}>
        <Mainbar>{children}</Mainbar>
      </body>
    </html>
  );
}
