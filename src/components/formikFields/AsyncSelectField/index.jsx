import { useEffect, useState } from "react";
import { SelectField } from "@components/formikFields";

export default function AsyncSelectField({ getData, placeholder, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [getData]);

  return (
    <>
      {
        <SelectField
          {...props}
          options={data}
          disabled={isLoading}
          placeholder={isLoading ? "Cargando opciones" : placeholder}
        />
      }
    </>
  );
}
