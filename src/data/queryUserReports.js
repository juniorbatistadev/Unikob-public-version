import Parse from "parse";

const UserReport = Parse.Object.extend("UserReport");
const query = new Parse.Query(UserReport);

export const saveUserReport = ({ text, toUser }) => {
  const userReport = new UserReport();
  userReport.set("text", text);
  userReport.set("toUser", toUser);
  return userReport.save();
};
