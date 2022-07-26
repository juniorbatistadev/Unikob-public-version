import withAuth from "src/helpers/withAuth";
import CurriculumSettingsPage from "@pages/SettingsPage/CurriculumSettings";

function CurriculumSettings() {
  return <CurriculumSettingsPage />;
}

export default withAuth(CurriculumSettings);
