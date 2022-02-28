import withAuth from "@context/withAuth";
import NotificationPage from "@pages/NotificationPage";

function Notifications() {
  return <NotificationPage />;
}

export default withAuth(Notifications);
