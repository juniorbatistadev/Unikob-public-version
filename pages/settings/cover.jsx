import withAuth from "@context/withAuth";
import CoverSettingsPage from "@pages/SettingsPage/CoverSettings";

function CoverSettings() {
  return <CoverSettingsPage />;
}

export default withAuth(CoverSettings);
