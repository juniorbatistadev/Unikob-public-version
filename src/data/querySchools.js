import Parse from "parse";
import queryCountries from "./queryCountries";

const Country = Parse.Object.extend("Country");
const School = Parse.Object.extend("School");
const query = new Parse.Query(School);

export const saveSchool = async ({
  name,
  country,
  description,
  type,
  website,
}) => {
  try {
    const school = new School();
    const countryData = await queryCountries.get(country);

    school.set("name", name);
    school.set("country", countryData);
    school.set("type", type);
    school.set("website", website);
    school.set("description", description);

    await school.save();

    return school;
  } catch (err) {
    throw err;
  }
};

export const getSchoolById = async (id) => {
  const query = new Parse.Query(School);
  query.include("country");
  return await query.get(id);
};

export const getSchoolMembersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = queryData.relation("members").query();

  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};
export const searchSchoolWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(School);

  query.fullText("name", queryData);
  query.limit(perPage);
  query.include("country");
  query.skip(startFrom);
  query.withCount();
  query.find();

  const result = await query.find();

  return result;
};

export const getSchoolBySlug = async (slug) => {
  try {
    const query = new Parse.Query(School);

    query.equalTo("slug", slug);
    query.include("createdBy");

    const result = await query.first();

    return result;
  } catch (err) {
    throw err;
  }
};

export const getSchoolsByMember = async (user) => {
  try {
    const query = new Parse.Query(School);

    query.equalTo("members", user);

    const result = await query.find();

    return result;
  } catch (err) {
    throw err;
  }
};

export const getRecentSchoolsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(School);

  if (queryData) {
    const country = new Country();
    country.id = queryData;

    console.log(country);
    query.equalTo("country", country);
  }

  query.descending("createdAt");
  query.limit(perPage);
  query.include("country");
  query.skip(startFrom);
  query.withCount();
  query.find();

  const result = await query.find();

  return result;
};

export default query;
