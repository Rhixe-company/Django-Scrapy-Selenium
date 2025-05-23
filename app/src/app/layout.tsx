import type { Metadata } from "next";
import { Fira_Sans, Fira_Mono } from "next/font/google";
import "./styles/globals.css";

const fira_Sans = Fira_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const fira_Mono = Fira_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Rhixe Scans",
  description: "Read Comics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`font-sans dark`}
      className={`${fira_Sans.variable} ${fira_Mono.variable} dark`}
    >
      <body
        // className={`font-sans antialiased min-h-screen`}
        className={`${fira_Sans.variable} ${fira_Mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
