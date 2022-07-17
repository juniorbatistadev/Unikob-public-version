import { AsyncSelectField } from "@components/formikFields";
import Parse from "parse";

export default function SelectCountry(props) {
  const getData = async () => {
    const list = [];
    const queryCountries = new Parse.Query(Parse.Object.extend("Country"));
    const data = await queryCountries.find();
    if (props.firstOption) {
      list[0] = {
        name: props.firstOption.name,
        id: props.firstOption.id,
      };
    }
    await data.forEach((country) => {
      list.push({
        name: country.attributes.name,
        id: country.id,
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
