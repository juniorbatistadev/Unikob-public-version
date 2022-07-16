import Parse from "parse";

const TeacherReview = Parse.Object.extend("TeacherReview");
const query = new Parse.Query(TeacherReview);

export const saveTeacherRating = async ({ teacher, description, rating }) => {
  const teacherReview = new TeacherReview();
  teacherReview.set("teacher", teacher);
  teacherReview.set("description", description);
  teacherReview.set("rating", rating);
  return await teacherReview.save();
};

export const checkIfUserAlreadyReviewedThisTeacher = async ({
  user,
  teacher,
}) => {
  const query = new Parse.Query(TeacherReview);
  query.equalTo("createdBy", user);
  query.equalTo("teacher", teacher);
  const result = await query.find();

  return result;
};

export const getTeacherReviewsWithPagination = async ({
  startFrom,
  perPage,
  queryData,
}) => {
  const query = new Parse.Query(TeacherReview);
  query.equalTo("teacher", queryData);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const deleteTeacherReview = async (teacherReviewId) => {
  const query = new Parse.Query(TeacherReview);
  const result = await query.get(teacherReviewId);

  return result.destroy();
};

export default query;
