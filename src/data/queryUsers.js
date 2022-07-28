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

export const searchUsersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Parse.User);

  console.log(queryData, startFrom, perPage);

  query.startsWith("username", String(queryData).toLocaleLowerCase());
  query.limit(perPage);
  query.includeAll();
  query.skip(startFrom);
  query.withCount();
  query.find();

  const result = await query.find();

  console.log(result);

  return result;
};
export default query;
