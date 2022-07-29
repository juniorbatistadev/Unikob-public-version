import Parse from "parse";

const Saved = Parse.Object.extend("Saved");
const query = new Parse.Query(Saved);

export const saveSaved = async ({ type, itemId, title, typeClass }) => {
  const saved = new Saved();
  const TypeClass = Parse.Object.extend(typeClass);
  const typeClassObject = new TypeClass();
  typeClassObject.id = itemId;

  saved.set("title", title);
  saved.set("type", type);
  saved.set(type, typeClassObject);

  return await saved.save();
};

export const isItemSaved = async ({ type, itemId, typeClass }) => {
  const TypeClass = Parse.Object.extend(typeClass);
  const typeClassObject = new TypeClass();
  typeClassObject.id = itemId;

  const query = new Parse.Query(Saved);
  query.equalTo(type, typeClassObject);
  const result = await query.count();

  return result > 0 ? true : false;
};

export const deleteSaved = async ({ type, itemId, typeClass }) => {
  const TypeClass = Parse.Object.extend(typeClass);
  const typeClassObject = new TypeClass();
  typeClassObject.id = itemId;

  const query = new Parse.Query(Saved);
  query.equalTo(type, typeClassObject);
  const result = await query.first();

  return result.destroy();
};

export const getSavedsWithPagination = async ({ startFrom, perPage, user }) => {
  const query = new Parse.Query(Saved);

  query.equalTo("createdBy", user);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
