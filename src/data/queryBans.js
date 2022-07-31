import Parse from "parse";

const Ban = Parse.Object.extend("Ban");
const query = new Parse.Query(Ban);

export const saveBan = async (user) => {
  const ban = new Ban();
  ban.set("user", user);
  const result = await ban.save();

  return result;
};

export default query;
