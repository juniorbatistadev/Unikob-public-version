import withAuth from "src/helpers/withAuth";
import SchoolSettingsPage from "@pages/SettingsPage/SchoolSettings";

function SchoolSettings() {
  return <SchoolSettingsPage />;
}

export default withAuth(SchoolSettings);
