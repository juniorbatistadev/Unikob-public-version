import Parse from "parse";

const query = new Parse.Query(Parse.User);

export const getUserById = async (userId) => {
  query.include("country");
  query.include("school");

  const user = query.get(userId);
  return user;
};

export const getUserByUsername = async (username) => {
  query.equalTo("username", username);
  query.include("country");
  query.include("school");

  const user = query.first({ caseInsensitive: true });
  return user;
};

export default query;
