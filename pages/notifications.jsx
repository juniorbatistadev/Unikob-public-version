import withAuth from "src/helpers/withAuth";
import NotificationPage from "@pages/NotificationPage";

function Notifications() {
  return <NotificationPage />;
}

export default withAuth(Notifications);
