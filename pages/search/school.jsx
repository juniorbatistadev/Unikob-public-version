import withAuth from "src/helpers/withAuth";
import SearchSchoolPage from "@pages/SearchFeature/SearchSchoolPage";

function SearchSchool() {
  return <SearchSchoolPage />;
}

export default withAuth(SearchSchool);
