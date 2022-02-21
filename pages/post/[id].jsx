import ReadPostPage from "@pages/ReadPostPage";
import { getPostByIdServerSide } from "src/data/server/queryPostsFromServer";

function ReadPost({ data }) {
  return <ReadPostPage post={data} />;
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const post = await getPostByIdServerSide(id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const postData = await post.toJSON();

  return {
    props: { data: postData },
  };
}

export default ReadPost;
