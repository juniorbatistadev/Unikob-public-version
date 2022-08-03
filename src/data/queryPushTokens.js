import Parse from "parse";

const PushToken = Parse.Object.extend("PushToken");
const query = new Parse.Query(PushToken);

export const savePushToken = ({ device, token }) => {
  const pushToken = new PushToken();
  pushToken.set("token", token);
  pushToken.set("device", device);
  return pushToken.save();
};

export default query;
