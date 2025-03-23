import type { AppProps } from "next/app";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import Layout from "@/components/partials/Layout";
import { Fira_Sans, Fira_Mono } from "next/font/google";
// import { Provider } from "react-redux";
// import store from "@/services/store";

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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
    // <Provider store={store}>
    //   <div className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
    //     <Layout>
    //       <Component {...pageProps} />
    //     </Layout>
    //   </div>
    // </Provider>
  );
}
