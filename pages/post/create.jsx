import CreatePostPage from "@pages/PostFeature/CreatePostPage";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function CreatePost() {
  useAuthenticatedPage();

  return <CreatePostPage />;
}
