import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/soccer.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
