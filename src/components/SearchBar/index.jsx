import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ErrorMessage, TextField } from "@components/formikFields";
import styles from "./index.module.css";
import SearchIcon from "@assets/icons/search.svg";
import FlexColumn from "@components/common/FlexColumn";
import { useRouter } from "next/router";
import { SEARCH_PATH } from "src/paths";

function SearchBar({ className, callBack }) {
  const { push } = useRouter();

  const handleSubmit = (values, actions) => {
    push({
      pathname: SEARCH_PATH,
      query: {
        s: values.search,
      },
    });
    actions.resetForm();

    callBack();
  };

  return (
    <FlexColumn className={className}>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={Yup.object({
          search: Yup.string().required("Requerido"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <TextField
            className={styles.input}
            padding="12px"
            placeholder="¿Quieres encontrar algo?"
            name="search"
            type="search"
          />
          <button className={styles.button} type="submit">
            <SearchIcon
              alt="Search"
              width={15}
              className={styles.icon}
              fill="var(--color-gray-600)"
            />
          </button>
        </Form>
      </Formik>
    </FlexColumn>
  );
}

SearchBar.defaultProps = {
  className: " ",
};

export default SearchBar;
