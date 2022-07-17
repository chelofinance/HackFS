import {Provider} from "react-redux";
import type {AppProps} from "next/app";

import Layout from "@components/layout";
import "styles/globals.css";
import "styles/global-tailwind.css";
import "styles/globals.scss";
import "styles/styles-ant.scss";
import "styles/index.scss";
import {store} from "@redux/store";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
