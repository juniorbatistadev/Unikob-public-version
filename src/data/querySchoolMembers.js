import Parse from "parse";

const SchoolMember = Parse.Object.extend("SchoolMember");
const query = new Parse.Query(SchoolMember);

export const saveSchoolMember = (school) => {
  const schoolMember = new SchoolMember();
  schoolMember.set("school", school);
  return schoolMember.save();
};

export const isMemberOfSchool = async (user, school) => {
  const query = new Parse.Query(SchoolMember);
  query.equalTo("user", user);
  query.equalTo("school", school);
  const result = await query.count();

  return result > 0 ? true : false;
};

export const unjoinSchool = async (user, school) => {
  const query = new Parse.Query(SchoolMember);
  query.equalTo("user", user);
  query.equalTo("school", school);
  const result = await query.first();

  return result.destroy();
};

export const getSchoolsByMember = async (user) => {
  const query = new Parse.Query(SchoolMember);

  query.equalTo("user", user);
  query.includeAll();

  const result = await query.find();

  return result;
};

export const getSchoolMembersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(SchoolMember);

  query.equalTo("school", queryData);
  query.skip(startFrom);
  query.descending("createdAt");
  query.includeAll();
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
