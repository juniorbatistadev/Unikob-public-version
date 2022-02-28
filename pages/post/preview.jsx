import PreviewPostPage from "@pages/PostFeature/PreviewPostPage";
import withAuth from "@context/withAuth";

function PreviewPost() {
  return <PreviewPostPage />;
}

export default withAuth(PreviewPost);
