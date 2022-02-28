import withAuth from "@context/withAuth";
import NotificationPage from "src/features/NotificationPage";

function Notifications() {
  return <NotificationPage />;
}

export default withAuth(Notifications);
