import Parse from "parse";

const Ban = Parse.Object.extend("Ban");
const query = new Parse.Query(Ban);

export const saveBan = async (user) => {
  const ban = new Ban();
  ban.set("user", user);
  const result = await ban.save();

  return result;
};

export const isUserBanned = async (user) => {
  const query = new Parse.Query(Ban);
  query.equalTo("user", user);
  const result = await query.count();

  return result > 0 ? true : false;
};

export default query;
