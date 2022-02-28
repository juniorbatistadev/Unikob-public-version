import withAuth from "@context/withAuth";
import CreatePostPage from "@pages/PostFeature/CreatePostPage";

function CreatePost() {
  return <CreatePostPage />;
}
export default withAuth(CreatePost);
