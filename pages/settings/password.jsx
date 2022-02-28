import withAuth from "@context/withAuth";
import PasswordSettingsPage from "@pages/SettingsPage/PasswordSettings";

function PasswordSettings() {
  return <PasswordSettingsPage />;
}

export default withAuth(PasswordSettings);
