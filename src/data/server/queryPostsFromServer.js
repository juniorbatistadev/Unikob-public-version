import Parse from "./initParse";
const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const getPostByIdServerSide = async (id) => {
  try {
    const query = new Parse.Query(Post);

    query.include("createdBy");

    const result = await query.get(id);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getPostBySlugServerSide = async (slug) => {
  try {
    const query = new Parse.Query(Post);

    query.equalTo("slug", slug);

    query.include("createdBy");

    const result = await query.first();

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default query;
