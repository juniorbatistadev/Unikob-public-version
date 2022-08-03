import Parse from "./initParse";

const Job = Parse.Object.extend("Job");
const query = new Parse.Query(Job);

export const getJobsWithPaginationFromServer = async ({
  startFrom,
  perPage,
}) => {
  const query = new Parse.Query(Job);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
