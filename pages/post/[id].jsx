import ReadPostPage from "@pages/ReadPostPage";
import { getPostByIdServerSide } from "src/data/server/queryPostsFromServer";

function ReadPost({ data }) {
  return <ReadPostPage post={data} />;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const postData = await (await getPostByIdServerSide(id)).toJSON();

  return {
    props: { data: postData },
  };
}

export default ReadPost;
