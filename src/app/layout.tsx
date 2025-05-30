import MyApp from "@/components/MyApp";

import { Fira_Sans } from "next/font/google";

import "./styles/globals.css";

const fira_SansSans = Fira_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={fira_SansSans.className}
      suppressHydrationWarning
    >
      <body>
        <MyApp>{children}</MyApp>
      </body>
    </html>
  );
}
