import Parse from "parse";

const UserReport = Parse.Object.extend("UserReport");
const query = new Parse.Query(UserReport);

export const saveUserReport = ({ text, toUser, content }) => {
  const userReport = new UserReport();
  userReport.set("text", text);
  if (toUser) userReport.set("toUser", toUser);
  if (content) userReport.set("content", content);

  return userReport.save();
};
