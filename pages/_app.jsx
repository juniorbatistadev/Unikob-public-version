import "styles/globals.css";
import Parse from "parse";
import AuthContextProvider from "src/contexts/AuthContext";
import MainLayout from "src/layouts/MainLayout";
import Head from "next/head";

function App({ Component, pageProps }) {
  //checking if env is browser
  if (typeof window !== "undefined") {
    Parse.initialize(
      process.env.NEXT_PUBLIC_APP_ID,
      process.env.NEXT_PUBLIC_APP_JAVASCRIPT_KEY
    );

    Parse.serverURL =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:1447/parse"
        : "https://parseapi.back4app.com/";
  }

  const DefaultLayout = MainLayout;
  const Layout = Component.layout || DefaultLayout;

  console.log("Lastest build JR.");

  return (
    <AuthContextProvider>
      <Head>
        <title>GenteUni</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
