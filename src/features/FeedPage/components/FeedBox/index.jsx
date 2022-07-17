import FlexColumn from "@components/common/FlexColumn";
import styles from "./index.module.css";

const FeedBox = ({ children, color }) => {
  return (
    <div
      className={styles.header}
      style={{ boxShadow: `-5px 8px 0px 0px ${color}` }}
    >
      {children}
    </div>
  );
};

export default FeedBox;
