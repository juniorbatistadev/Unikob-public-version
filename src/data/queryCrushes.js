import Parse from "parse";

const Crush = Parse.Object.extend("Crush");
const query = new Parse.Query(Crush);

export const saveCrush = ({ text, toUser, isSecret }) => {
  const crush = new Crush();
  crush.set("text", text);
  crush.set("toUser", toUser);
  crush.set("isSecret", isSecret);
  return crush.save();
};

export const getSchoolCrushesWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Crush);

  query.equalTo("schools", queryData);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const getRecentCrushesWithPagination = async ({
  startFrom,
  perPage,
}) => {
  const query = new Parse.Query(Crush);

  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const getCrushById = async (id) => {
  const query = new Parse.Query(Crush);

  query.includeAll();
  const result = await query.get(id);

  return result;
};

export default query;
