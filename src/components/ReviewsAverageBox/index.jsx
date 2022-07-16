import FlexColumn from "@components/common/FlexColumn";
import styles from "./index.module.css";
import Rater from "@components/formikFields/Rater";

const ReviewAverageBox = ({ avg, reviews }) => {
  return (
    <FlexColumn className={styles.container}>
      <FlexColumn className={styles.box}>
        <p className={styles.avg}>{avg}</p>
        <Rater disabled={true} value={avg} />
        <p className={styles.text}>{reviews} reviews </p>
      </FlexColumn>
    </FlexColumn>
  );
};

export default ReviewAverageBox;
