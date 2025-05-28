// import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import { Fira_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rhixescans",
  description: "The fastest way to build apps with Next.js and Supabase",
};

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
    <html lang="en" className={fira_SansSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"}>Rhixescans</Link>
                {/* <div className="flex items-center gap-2">
                      <DeployButton />
                    </div> */}
              </div>
              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            </div>
          </nav>
          <main
            className="max-w-[1220px] pt-2"
            style={{
              overflow: "hidden",
              margin: "0 auto",
              paddingBottom: "9rem",
            }}
          >
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
          </main>
          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-2 py-4">
            <p>
              Powered by{" "}
              <a
                href="/"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Rhixescans
              </a>
            </p>
            <ThemeSwitcher />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
