import Parse from "parse";

export const getUserRoles = async (user) => {
  const roles = await new Parse.Query(Parse.Role).equalTo("users", user).find();

  return roles;
};
