import withAuth from "src/helpers/withAuth";
import CreateSchoolPage from "@pages/SchoolFeature/CreateSchoolPage";

function CreateSchool() {
  return <CreateSchoolPage />;
}
export default withAuth(CreateSchool);
