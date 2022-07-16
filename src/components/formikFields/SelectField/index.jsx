import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";
import Select from "react-dropdown-select";

function SelectFieldFormik({ options, className, multi, name, ...props }) {
  const classNames = [styles.select, className].join(" ");
  const [, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const handleChange = (values) => {
    if (!multi) {
      setValue(values[0]?.id);
    } else {
      setValue(values);
    }

    if (props.onChange) props.onChange();
  };

  const valueOptions = Array.isArray(value) ? value : [value];

  const selectedOptions = options.filter((option) =>
    valueOptions.includes(option.id)
  );

  return (
    <Select
      options={options}
      onChange={handleChange}
      labelField="name"
      searchBy="name"
      values={selectedOptions}
      valueField="id"
      className={classNames}
      name={name}
      multi={multi}
      {...props}
    />
  );
}

SelectFieldFormik.defaultProps = {
  className: " ",
  options: [],
  name: "",
  multi: false,
};

export default SelectFieldFormik;
