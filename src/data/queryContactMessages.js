import Parse from "parse";

const ContactMessage = Parse.Object.extend("ContactMessage");
const query = new Parse.Query(ContactMessage);

export const saveContactMessage = async ({ email, message }) => {
  const contactMessage = new ContactMessage();
  contactMessage.set("email", email);
  contactMessage.set("message", message);
  const result = await contactMessage.save();

  return result;
};

export default query;
