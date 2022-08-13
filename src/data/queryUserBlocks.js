import Parse from "parse";

const UserBlock = Parse.Object.extend("UserBlock");
const query = new Parse.Query(UserBlock);

export const saveUserBlock = (toUser) => {
  const userBlock = new UserBlock();
  userBlock.set("toUser", toUser);
  return userBlock.save();
};

export const isBlocked = async (fromUser, toUser) => {
  const query = new Parse.Query(UserBlock);
  query.equalTo("fromUser", fromUser);
  query.equalTo("toUser", toUser);
  const result = await query.count();

  return result > 0 ? true : false;
};

export const deleteBlock = async (fromUser, toUser) => {
  const query = new Parse.Query(UserBlock);
  query.equalTo("fromUser", fromUser);
  query.equalTo("toUser", toUser);
  const result = await query.first();

  return result.destroy();
};

export default query;
