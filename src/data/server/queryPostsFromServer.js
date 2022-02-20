import Parse from "./initParse";
const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const getPostByIdServerSide = async (id) => {
  const query = new Parse.Query(Post);
  query.include("byUser");

  const result = await query.get(id);

  return result;
};

export default query;
