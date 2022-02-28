import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import EditPostPage from "@pages/PostFeature/EditPostPage";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getPostById } from "src/data/queryPosts";
import { FEED_PATH } from "src/paths";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

export default function EditPost() {
  const [post, setPost] = useState();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useAuthenticatedPage();

  useEffect(() => {
    const getData = async () => {
      try {
        const postObject = await getPostById(id);

        setPost(postObject);

        if (postObject.attributes.createdBy.id !== currentUser?.id) {
          throw "No puedes editar este post.";
        }

        setIsLoading(false);
      } catch (err) {
        router.push(FEED_PATH);
      }
    };

    if (id) {
      getData();
    }
  }, [id, currentUser?.id, router]);

  return isLoading ? <Spinner /> : <EditPostPage post={post} />;
}
