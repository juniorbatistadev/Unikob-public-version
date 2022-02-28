import withAuth from "@context/withAuth";
import SettingsPage from "@pages/SettingsPage";

function Settings() {
  return <SettingsPage />;
}

export default withAuth(Settings);
