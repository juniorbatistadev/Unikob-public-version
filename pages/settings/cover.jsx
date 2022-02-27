import CoverSettingsPage from "@pages/SettingsPage/CoverSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function CoverSettings() {
  useAuthenticatedPage();

  return <CoverSettingsPage />;
}
