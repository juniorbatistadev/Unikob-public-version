import Parse from "parse";

const UserSetting = Parse.Object.extend("UserSetting");
const query = new Parse.Query(UserSetting);

export const getUserSettingByUser = async (user) => {
  const query = new Parse.Query(UserSetting);
  query.equalTo("user", user);

  const result = await query.first();

  return result;
};

export const saveNotificationSetting = async ({ notificationTypes, user }) => {
  let userSetting = await getUserSettingByUser(user);

  userSetting.set("notificationsAllowed", notificationTypes);

  return userSetting.save();
};

export const saveUserCurriculumSetting = async ({ content, user }) => {
  let userSetting = await getUserSettingByUser(user);

  userSetting.set("curriculum", content);

  return userSetting.save();
};

export default query;
