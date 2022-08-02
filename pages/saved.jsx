import withAuth from "src/helpers/withAuth";
import SavedPage from "@pages/SavedPage";
import Head from "next/head";

function Saved() {
  return (
    <>
      <Head>
        <title>Guardados - Unikob</title>
      </Head>
      <SavedPage />
    </>
  );
}

export default withAuth(Saved);
