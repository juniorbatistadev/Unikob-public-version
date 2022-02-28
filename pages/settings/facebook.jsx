import withAuth from "@context/withAuth";
import FacebookSettingsPage from "@pages/SettingsPage/FacebookSettings";

function FacebookSettings() {
  return <FacebookSettingsPage />;
}

export default withAuth(FacebookSettings);
