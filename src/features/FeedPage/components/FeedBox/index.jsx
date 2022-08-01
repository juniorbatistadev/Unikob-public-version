import FlexColumn from "@components/common/FlexColumn";
import styles from "./index.module.css";

const FeedBox = ({ children }) => {
  return <FlexColumn className={styles.header}>{children}</FlexColumn>;
};

export default FeedBox;
