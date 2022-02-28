import withAuth from "src/helpers/withAuth";
import ProfileSettingsPage from "@pages/SettingsPage/ProfileSettings";

function ProfileSettings() {
  return <ProfileSettingsPage />;
}

export default withAuth(ProfileSettings);
