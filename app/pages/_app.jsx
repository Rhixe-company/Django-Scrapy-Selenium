import Layoutbar from "@/components/Layoutbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layoutbar>
      <Component {...pageProps} />
    </Layoutbar>
  );
}
