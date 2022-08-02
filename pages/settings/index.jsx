import withAuth from "src/helpers/withAuth";
import SettingsPage from "@pages/SettingsPage";
import Head from "next/head";

function Settings() {
  return (
    <>
      <Head>
        <title>Adjustes - Unikob</title>
      </Head>
      <SettingsPage />
    </>
  );
}

export default withAuth(Settings);
