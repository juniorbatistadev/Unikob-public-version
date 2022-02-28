import PreviewPostPage from "@pages/PostFeature/PreviewPostPage";
import withAuth from "src/helpers/withAuth";

function PreviewPost() {
  return <PreviewPostPage />;
}

export default withAuth(PreviewPost);
