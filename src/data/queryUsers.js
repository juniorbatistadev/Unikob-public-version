import Parse from "parse";

const query = new Parse.Query(Parse.User);

export const getUserById = async (userId) => {
  query.includeAll();

  const user = query.get(userId);
  return user;
};

export const getUserByUsername = async (username) => {
  query.equalTo("username", username);
  query.includeAll();

  const user = await query.first();

  return user;
};

export default query;
