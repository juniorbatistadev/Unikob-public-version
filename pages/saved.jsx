import withAuth from "src/helpers/withAuth";
import SavedPage from "@pages/SavedPage";

function Saved() {
  return <SavedPage />;
}

export default withAuth(Saved);
