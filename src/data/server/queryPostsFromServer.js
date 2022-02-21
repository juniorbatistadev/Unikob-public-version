import Parse from "./initParse";
const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const getPostByIdServerSide = async (id) => {
  try {
    const query = new Parse.Query(Post);
    query.include("byUser");

    const result = await query.get(id);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default query;
