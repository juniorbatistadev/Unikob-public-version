import Parse from "./initParse";

const PostInfo = Parse.Object.extend("PostInfo");
const query = new Parse.Query(PostInfo);

export const savePostView = async (post) => {
  const postInfo = post.attributes.postInfo;

  postInfo.increment("views");
  postInfo.save();
};
