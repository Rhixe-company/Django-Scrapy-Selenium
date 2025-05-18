import { StoreProvider } from "./StoreProvider";
import Layoutbar from "@/components/Layoutbar";
import "@/styles/globals.css";
interface Props {
  readonly pageProps: any;
  readonly Component: any;
}
export default function App({ Component, pageProps }: Props) {
  return (
    <StoreProvider>
      <Layoutbar>
        <Component {...pageProps} />
      </Layoutbar>
    </StoreProvider>
  );
}
