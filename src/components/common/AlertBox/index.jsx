import styles from "./index.module.css";

function AlertBox({ type, text }) {
  return (
    <div className={styles[type]}>
      <i class="fa fa-warning"></i>
      {text}
    </div>
  );
}

export default AlertBox;
