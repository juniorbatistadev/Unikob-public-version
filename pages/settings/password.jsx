import PasswordSettingsPage from "@pages/SettingsPage/PasswordSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function PasswordSettings() {
  useAuthenticatedPage();
  return <PasswordSettingsPage />;
}
