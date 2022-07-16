import Parse from "parse";

const Teacher = Parse.Object.extend("Teacher");
const Subject = Parse.Object.extend("Subject");
const query = new Parse.Query(Teacher);

export const saveTeacher = async ({ name, subjects, school }) => {
  const teacher = new Teacher();
  const querySubject = new Parse.Query(Subject);

  const subjectsObjArray = [];

  for (const subject of subjects) {
    const result = await querySubject.get(subject.id);
    subjectsObjArray.push(result);
  }

  teacher.set("name", name);
  teacher.set("school", school);
  teacher.relation("subjects").add(subjectsObjArray);

  return await teacher.save();
};

export const getTeacherById = async (id) => {
  const query = new Parse.Query(Teacher);
  query.include("school");
  query.include("subjects");

  const result = await query.get(id);

  return result;
};

export const getSchoolTeachersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Teacher);
  const querySubject = new Parse.Query("Subject");

  console.log(user);

  if (user) {
    const subjectResult = await querySubject.get(user);
    query.equalTo("subjects", subjectResult);
  }

  query.equalTo("school", queryData);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
