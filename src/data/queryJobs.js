import Parse from "parse";

const Job = Parse.Object.extend("Job");
const SubjectObject = Parse.Object.extend("Subject");
const CountryObject = Parse.Object.extend("Country");
const query = new Parse.Query(Job);

export const saveJob = async ({ title, content, subjects, country }) => {
  const job = new Job();
  const querySubject = new Parse.Query(SubjectObject);
  const queryCountry = new Parse.Query(CountryObject);

  const fetchedCountry = await queryCountry.get(country);

  const subjectsObjArray = [];

  for (const subject of subjects) {
    const result = await querySubject.get(subject.id);
    subjectsObjArray.push(result);
  }

  job.set("title", title);
  job.set("content", content);
  job.set("country", fetchedCountry);
  job.relation("subjects").add(subjectsObjArray);
  const result = await job.save();

  return result;
};

export const getJobById = async (id) => {
  const query = new Parse.Query(Job);
  query.includeAll();

  const result = await query.get(id);

  return result;
};

export const getJobsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Job);
  const querySubject = new Parse.Query("Subject");
  const queryCountry = new Parse.Query("Country");

  if (user) {
    const subjectResult = await querySubject.get(user);
    query.equalTo("subjects", subjectResult);
  }

  if (queryData) {
    const countryResult = await queryCountry.get(queryData);
    query.equalTo("country", countryResult);
  }

  query.skip(startFrom);
  query.includeAll();
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const searchJobsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Job);

  query.fullText("title", queryData);
  query.limit(perPage);
  query.includeAll();
  query.skip(startFrom);
  query.withCount();
  query.find();

  const result = await query.find();

  return result;
};

export const deleteJob = async (jobId) => {
  const query = new Parse.Query(Job);
  const result = await query.get(jobId);

  return result.destroy();
};

export default query;
