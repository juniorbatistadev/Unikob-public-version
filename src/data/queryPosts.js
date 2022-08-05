import Parse from "parse";

const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const savePost = async ({ user, title, content }) => {
  const post = new Post();
  post.set("title", title);
  post.set("content", content);
  const result = await post.save();

  return result;
};

export const updatePost = async ({ user, title, content, post }) => {
  post.set("byUser", user);
  post.set("title", title);
  post.set("content", content);
  post.set("edited", true);
  const result = await post.save();

  return result;
};

export const getPostById = async (id) => {
  const query = new Parse.Query(Post);
  query.include("createdBy");

  const result = await query.get(id);

  return result;
};

export const getPostsWithPagination = async ({ startFrom, user, perPage }) => {
  const query = new Parse.Query(Post);
  query.equalTo("createdBy", user);
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const deletePost = async (postId) => {
  const query = new Parse.Query(Post);
  const result = await query.get(postId);

  console.log(result, postId);

  return result.destroy();
};

export const getPostBySlug = async (slug) => {
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

export const searchPostsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Post);

  query.fullText("title", queryData);
  query.limit(perPage);
  query.includeAll();
  query.skip(startFrom);
  query.withCount();
  query.find();

  const result = await query.find();

  return result;
};

export default query;
