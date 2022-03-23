import Parse from "./initParse";

const School = Parse.Object.extend("School");
const query = new Parse.Query(School);

export const getSchoolFromServerBySlug = async (slug) => {
  try {
    const query = new Parse.Query(School);

    query.equalTo("slug", slug);

    query.includeAll();

    const result = await query.first();

    return result;
  } catch (err) {
    throw err;
  }
};

export default query;
