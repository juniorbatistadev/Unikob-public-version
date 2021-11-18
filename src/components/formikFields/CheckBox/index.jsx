import { useField } from "formik";

function CheckBox({ className, children, ...props }) {
  const [field] = useField({ ...props, type: "checkbox" });

  return (
    <label className={className}>
      <input type="checkbox" {...field} {...props} />
      {children}
    </label>
  );
}

export default CheckBox;
