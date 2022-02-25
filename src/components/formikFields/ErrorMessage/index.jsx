import { connect, getIn } from "formik";
import styles from "./index.module.css";

function ErrorMessage(props) {
  const classNames = [styles.error, props.className].join(" ");

  const error = getIn(props.formik.errors, props.name);
  const touch = getIn(props.formik.touched, props.name);

  return <>{touch && error && <span className={classNames}>{error}</span>}</>;
}

export default connect(ErrorMessage);
