import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import EditPostPage from "@pages/PostFeature/EditPostPage";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getPostBySlug } from "src/data/queryPosts";
import { FEED_PATH } from "src/paths";
import withAuth from "src/helpers/withAuth";

function EditPost() {
  const [post, setPost] = useState();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getData = async () => {
      try {
        const postObject = await getPostBySlug(slug);

        await setPost(postObject);

        if (postObject.attributes.createdBy.id !== currentUser?.id) {
          throw "No puedes editar este post.";
        }

        setIsLoading(false);
      } catch (err) {
        router.push(FEED_PATH);
      }
    };

    if (slug) {
      getData();
    }
  }, [slug, currentUser?.id, router]);

  return isLoading ? <Spinner /> : <EditPostPage post={post} />;
}

export default withAuth(EditPost);
