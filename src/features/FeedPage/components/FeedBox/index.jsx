import FlexColumn from "@components/common/FlexColumn";
import styles from "./index.module.css";

const FeedBox = ({ children, color, text }) => {
  return (
    <FlexColumn className={styles.header}>
      {color && (
        <div className={styles.bar} style={{ background: color }}>
          <p className={styles.barText}>{text}</p>
        </div>
      )}

      {children}
    </FlexColumn>
  );
};

export default FeedBox;
