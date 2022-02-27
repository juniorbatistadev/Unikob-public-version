import NotificationSettingsPage from "@pages/SettingsPage/NotificationSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function NotificationSettings() {
  useAuthenticatedPage();
  return <NotificationSettingsPage />;
}
