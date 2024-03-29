import Parse from "parse";

const Comment = Parse.Object.extend("Comment");
export const query = new Parse.Query(Comment);

export const saveComment = ({ text, type, section, parentComment }) => {
  const comment = new Comment();
  comment.set("text", text);
  comment.set("section", section);
  parentComment && comment.set("parentComment", parentComment);
  comment.set("type", type);
  return comment.save();
};

export const getCommentsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Comment);
  query.equalTo("section", queryData);
  query.doesNotExist("parentComment");
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const getSubCommentsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const Comment = Parse.Object.extend("Comment");
  let parentCommentObj = new Comment();
  parentCommentObj.id = queryData;

  const query = new Parse.Query(Comment);
  query.equalTo("parentComment", parentCommentObj);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const deleteComment = async (commentId) => {
  const query = new Parse.Query(Comment);
  const comment = await query.get(commentId);
  return await comment.destroy();
};

export const getCommentsNumberBySectionId = async (sectionId) => {
  const query = new Parse.Query(Comment);
  query.equalTo("section", sectionId);
  const comments = await query.count();

  return comments;
};

export const getFirstCommentBySection = async (sectionId) => {
  const query = new Parse.Query(Comment);
  query.equalTo("section", sectionId);
  const comments = await query.first();

  return comments;
};

export default query;
