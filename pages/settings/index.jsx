import SettingsPage from "@pages/SettingsPage";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function Home() {
  useAuthenticatedPage();
  return <SettingsPage />;
}
