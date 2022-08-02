import withAuth from "src/helpers/withAuth";
import NotificationPage from "@pages/NotificationPage";
import Head from "next/head";

function Notifications() {
  return (
    <>
      <Head>
        <title>Notificaciones - Unikob</title>
      </Head>
      <NotificationPage />
    </>
  );
}

export default withAuth(Notifications);
