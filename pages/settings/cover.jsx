import withAuth from "src/helpers/withAuth";
import CoverSettingsPage from "@pages/SettingsPage/CoverSettings";

function CoverSettings() {
  return <CoverSettingsPage />;
}

export default withAuth(CoverSettings);
