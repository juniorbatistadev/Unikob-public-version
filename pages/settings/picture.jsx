import PictureSettingsPage from "@pages/SettingsPage/PictureSettings";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function PictureSettings() {
  useAuthenticatedPage();

  return <PictureSettingsPage />;
}
