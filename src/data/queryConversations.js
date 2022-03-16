import Parse from "parse";

const Conversation = Parse.Object.extend("Conversation");
const query = new Parse.Query(Conversation);

export const getUserConversationsWithPagination = async ({
  startFrom,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Conversation);

  query.equalTo("members", user);
  query.skip(startFrom);
  query.includeAll();
  query.descending("updatedAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export const getConversationById = async (id) => {
  const query = new Parse.Query(Conversation);

  return await query.get(id);
};

export const getConversationByMembers = async (currentUser, toUser) => {
  const query = new Parse.Query(Conversation);

  query.containsAll("members", [currentUser, toUser]);
  const result = await query.first();

  return result;
};

export default query;
