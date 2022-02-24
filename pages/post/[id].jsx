import ReadPostPage from "@pages/PostFeature/ReadPostPage";
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

  post.fetch();
  post.increment("views");
  post.save();

  //fix views number
  const postData = await post.toJSON();
  postData.views = post.attributes.views;

  return {
    props: { data: postData },
  };
}

export default ReadPost;
