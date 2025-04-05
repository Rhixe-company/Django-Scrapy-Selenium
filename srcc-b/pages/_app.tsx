import type { Metadata } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "./store";
import "@/styles/globals.scss";
import Layout from "@/components/Partials/Layout";
import { Fira_Sans, Fira_Mono } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Rhixe Scans",
  description: "Read Comics",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <div className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
};

export default MyApp;
