import withAuth from "src/helpers/withAuth";
import CreatePostPage from "@pages/PostFeature/CreatePostPage";

function CreatePost() {
  return <CreatePostPage />;
}
export default withAuth(CreatePost);
