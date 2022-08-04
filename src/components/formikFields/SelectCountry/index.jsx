import { AsyncSelectField } from "@components/formikFields";
import Parse from "parse";
import { getCountry } from "country-list-spanish";

export default function SelectCountry(props) {
  const getData = async () => {
    const list = [];
    const queryCountries = new Parse.Query(Parse.Object.extend("Country"));
    queryCountries.limit(1000);
    queryCountries.ascending("name");
    const data = await queryCountries.find();
    if (props.firstOption) {
      list[0] = {
        name: props.firstOption.name,
        id: props.firstOption.id,
      };
    }
    await data.forEach((country) => {
      list.push({
        name: getCountry(country.attributes.code),
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
