import withAuth from "src/helpers/withAuth";
import NotificationSettingsPage from "@pages/SettingsPage/NotificationSettings";

function NotificationSettings() {
  return <NotificationSettingsPage />;
}

export default withAuth(NotificationSettings);
