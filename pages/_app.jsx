import "styles/globals.css";
import Parse from "parse";
import AuthContextProvider from "src/contexts/AuthContext";
import MainLayout from "src/layouts/MainLayout";

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

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
