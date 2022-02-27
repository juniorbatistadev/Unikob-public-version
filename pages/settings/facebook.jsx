import FacebookSettingsPage from "@pages/SettingsPage/FacebookSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function FacebookSettings() {
  const { checkingAuth } = useAuthenticatedPage();

  return <>{!checkingAuth && <FacebookSettingsPage />}</>;
}
