import { useField } from "formik";
import styles from "./index.module.css";

function TextField({ width, padding, border, className, ...props }) {
  const [field] = useField(props);

  const classNames = [styles.input, className].join(" ");

  return (
    <input
      className={classNames}
      style={{
        width,
        padding,
        ...props.style,
      }}
      {...field}
      {...props}
    />
  );
}

TextField.defaultProps = {
  padding: "12px",
  className: " ",
  border: "none",
};

export default TextField;
