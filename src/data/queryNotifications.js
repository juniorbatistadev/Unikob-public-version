import Parse from "parse";
import { LOCAL_WS_ADDRESS } from "src/config";

const Notification = Parse.Object.extend("Notification");
const query = new Parse.Query(Notification);

export const getUnreadNumberOfNotifications = async (user) => {
  const query = new Parse.Query("Notification");

  query.equalTo("forUser", user);
  query.equalTo("wasSeen", false);

  const amount = await query.count();
  const subscrition = await query.subscribe();

  return { amount, subscrition };
};

export const readNotifications = async (user) => {
  const query = new Parse.Query("Notification");

  query.equalTo("forUser", user);
  query.equalTo("wasSeen", false);

  query.each(function (obj) {
    obj.set("wasSeen", true);
    obj.save();
    console.log(obj);
  }, {});
};

export const getUserNotificationsWithPagination = async ({
  startFrom,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Notification);

  query.equalTo("forUser", user);
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.includeAll();
  query.withCount();

  const result = await query.find();

  return result;
};

export default query;
