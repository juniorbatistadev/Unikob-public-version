import withAuth from "src/helpers/withAuth";
import PasswordSettingsPage from "@pages/SettingsPage/PasswordSettings";

function PasswordSettings() {
  return <PasswordSettingsPage />;
}

export default withAuth(PasswordSettings);
