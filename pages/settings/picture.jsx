import withAuth from "src/helpers/withAuth";
import PictureSettingsPage from "@pages/SettingsPage/PictureSettings";

export default function PictureSettings() {

  return <PictureSettingsPage />;
}

export default withAuth(PictureSettings)
