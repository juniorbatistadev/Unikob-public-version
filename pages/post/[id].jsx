import ReadPostPage from "@pages/PostFeature/ReadPostPage";
import { savePostView } from "src/data/server/queryPostInfo";
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

  //add view
  savePostView(post);

  //fix views number
  const postData = await post.toJSON();

  return {
    props: { data: postData },
  };
}

export default ReadPost;
