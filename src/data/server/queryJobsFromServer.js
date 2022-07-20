import Parse from "./initParse";
const Job = Parse.Object.extend("Job");
const query = new Parse.Query(Job);

export const getJobBySlugServerSide = async (slug) => {
  try {
    const query = new Parse.Query(Job);

    query.equalTo("slug", slug);

    query.includeAll();

    const result = await query.first();

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default query;
