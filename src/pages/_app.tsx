import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/layout";
import "styles/global-tailwind.css";
import "styles/globals.scss";
import "styles/styles-ant.scss";
import "styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
