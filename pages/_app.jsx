import "styles/globals.css";
import Parse from "parse";
import AuthContextProvider from "src/contexts/AuthContext";
import MainLayout from "src/layouts/MainLayout";
import Head from "next/head";
import { initFirebase } from "../initFirebase";
import Script from "next/script";

function App({ Component, pageProps }) {
  //checking if env is browser
  if (typeof window !== "undefined") {
    Parse.initialize(
      process.env.NEXT_PUBLIC_APP_ID,
      process.env.NEXT_PUBLIC_APP_JAVASCRIPT_KEY
    );

    Parse.serverURL = process.env.NEXT_PUBLIC_APP_PARSE_URL;
    Parse.liveQueryServerURL = process.env.NEXT_PUBLIC_APP_PARSE_WS_URL;
  }

  const DefaultLayout = MainLayout;
  const Layout = Component.layout || DefaultLayout;

  initFirebase();

  return (
    <AuthContextProvider>
      <Head>
        <title>Unikob</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="gtag">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
