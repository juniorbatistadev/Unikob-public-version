import withAuth from "src/helpers/withAuth";
import FacebookSettingsPage from "@pages/SettingsPage/FacebookSettings";

function FacebookSettings() {
  return <FacebookSettingsPage />;
}

export default withAuth(FacebookSettings);
