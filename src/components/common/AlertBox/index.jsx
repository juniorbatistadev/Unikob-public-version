import styles from "./index.module.css";

function AlertBox({ type, text }) {
  return <div className={styles[type]}>{text}</div>;
}

export default AlertBox;
