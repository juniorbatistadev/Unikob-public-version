import "styles/globals.css";
import Parse from "parse";
import AuthContextProvider from "src/contexts/AuthContext";
import MainLayout from "src/layouts/MainLayout";
import Head from "next/head";
import { initFirebase } from "../initFirebase";
import Script from "next/script";
import { useRouter } from "next/router";
import UnderMaintenancePage from "@pages/UnderMaintenancePage";

function App({ Component, pageProps }) {
  const { asPath } = useRouter();

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

  if (process.env.NEXT_PUBLIC_UNDER_MAINTENANCE === "true") {
    return <UnderMaintenancePage />;
  }

  return (
    <AuthContextProvider>
      <Head>
        <title>Unikob</title>
        {/* pwa */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/filled-logo-192x192.png" />
        <meta name="theme-color" content="#2b6cb0" />

        {/* seo */}
        <meta
          name="description"
          content="Unikob es la comunidad de universitarios, docentes, egresados y estudiantes mas completa del internet."
        />
        <meta property="og:title" content="Unikob" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_APP_FACEBOOK_APP_ID}
        />
        <meta
          property="og:description"
          content="Unikob es la comunidad de universitarios, docentes, egresados y estudiantes mas completa del internet."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_SITE_URL}${asPath}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_SITE_URL}/maskable_icon.png`}
        />

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@unikob_app" />
        <meta name="twitter:creator" content="@unikon_app" />
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
