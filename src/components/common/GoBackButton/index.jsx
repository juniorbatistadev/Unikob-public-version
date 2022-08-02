import ArrowIcon from "@assets/icons/left-arrow.svg";
import FlexRow from "@components/common/FlexRow";
import styles from "./GoBackButton.module.css";
import { useRouter } from "next/router";

const GoBackButton = ({ width, fill, margin }) => {
  const { back } = useRouter();

  return (
    <FlexRow
      onClick={() => back()}
      margin={margin}
      alignItems="center"
      className={styles.button}
    >
      <ArrowIcon width={width} fill={fill} />
    </FlexRow>
  );
};

GoBackButton.defaultProps = {
  width: "35px",
  fill: "var(--primary)",
  margin: "10px",
};

export default GoBackButton;
