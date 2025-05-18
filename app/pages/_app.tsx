import Layoutbar from "@/components/Layoutbar";
import "@/styles/globals.css";
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false,
});

interface Props {
  readonly pageProps: any;
  readonly Component: any;
}
export default function App({ Component, pageProps }: Props) {
  return (
    <ReduxProvider>
      <Layoutbar>
        <Component {...pageProps} />
      </Layoutbar>
    </ReduxProvider>
  );
}
