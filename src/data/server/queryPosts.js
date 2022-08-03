import Parse from "./initParse";

const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const getPostsWithPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Post);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
