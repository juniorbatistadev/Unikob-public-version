import PreviewPostPage from "@pages/PostFeature/PreviewPostPage";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function PreviewPost() {
  useAuthenticatedPage();

  return <PreviewPostPage />;
}
