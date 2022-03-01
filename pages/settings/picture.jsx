import withAuth from "src/helpers/withAuth";
import PictureSettingsPage from "@pages/SettingsPage/PictureSettings";

function PictureSettings() {
  return <PictureSettingsPage />;
}

export default withAuth(PictureSettings);
