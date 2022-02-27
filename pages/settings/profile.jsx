import ProfileSettingsPage from "@pages/SettingsPage/ProfileSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function ProfileSettings() {
  useAuthenticatedPage();
  return <ProfileSettingsPage />;
}
