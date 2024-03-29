import { AsyncSelectField } from "@components/formikFields";
import Parse from "parse";

export default function SelectSubject(props) {
  const getData = async () => {
    const list = [];
    const querySubjects = new Parse.Query(Parse.Object.extend("Subject"));
    const data = await querySubjects.find();

    if (props.firstOption) {
      list[0] = {
        name: props.firstOption.name,
        id: props.firstOption.id,
      };
    }

    await data.forEach((subject) => {
      list.push({
        name: subject.attributes.name,
        id: subject.id,
      });
    });

    return list;
  };

  return (
    <>
      <AsyncSelectField getData={getData} {...props} />
    </>
  );
}
