import Parse from "parse";

const ChatMessage = Parse.Object.extend("ChatMessage");
const query = new Parse.Query(ChatMessage);

export const getChatMessagesWithPagination = async ({ startFrom, perPage }) => {
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const saveChatMessage = async (values) => {
  const chatMessage = new ChatMessage();

  return await chatMessage.save(values);
};

export const subscribeToNewChatMessages = async () => {
  const query = new Parse.Query(ChatMessage);

  const subscrition = await query.subscribe();

  return subscrition;
};
