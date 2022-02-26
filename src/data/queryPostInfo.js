import Parse from "parse";

const PostInfo = Parse.Object.extend("PostInfo");
const query = new Parse.Query(PostInfo);

export const getViewsNumberByPostId = async (infoPostId) => {
  const query = new Parse.Query("PostInfo");

  const postInfo = await query.get(infoPostId);

  return postInfo.attributes.views;
};

export default query;
