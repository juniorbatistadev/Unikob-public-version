import Parse from "parse";

const JobApplication = Parse.Object.extend("JobApplication");
const Job = Parse.Object.extend("Job");
export const query = new Parse.Query(JobApplication);

export const saveJobApplication = ({ message, jobId }) => {
  const job = new Job();
  job.id = jobId;

  const jobApplication = new JobApplication();
  jobApplication.set("message", message);
  jobApplication.set("job", job);
  return jobApplication.save();
};

export const getApplicationsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const Job = Parse.Object.extend("Job");
  const job = new Job();
  job.id = queryData;

  const query = new Parse.Query(JobApplication);
  query.equalTo("job", job);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const checkIfUserApplied = async (jobId, user) => {
  const job = new Job();
  job.id = jobId;

  const query = new Parse.Query(JobApplication);
  query.equalTo("createdBy", user);
  query.equalTo("job", job);
  const result = await query.count();

  return result > 0 ? true : false;
};
