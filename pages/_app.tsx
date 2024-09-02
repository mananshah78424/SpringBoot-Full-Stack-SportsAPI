import Layout from "../components/Layout"; // Import the Layout component
import "../styles/globals.css"; // Ensure Tailwind CSS is imported

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
