import { useEffect, useState } from "react";
import { SelectField } from "@components/formikFields";

export default function AsyncSelectField({ getData, placeholder, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getData()
      .then((data) => {
        console.log(getData);

        setData(data);
      })
      .finally(() => setIsLoading(false));
  }, [getData]);

  return (
    <>
      {
        <SelectField
          options={data}
          disabled={isLoading}
          placeholder={isLoading ? "Cargando opciones" : placeholder}
          {...props}
        />
      }
    </>
  );
}
