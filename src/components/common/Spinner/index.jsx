import loadingGif from "@assets/images/loading-circle.gif";
import FlexColumn from "../FlexColumn";
import styles from "./index.module.css";

const Spinner = ({ width }) => {
  return (
    <FlexColumn justifyContent={"center"} alignItems={"center"}>
      <img alt="loading" src={loadingGif.src} style={{ width }} />
    </FlexColumn>
  );
};

Spinner.defaultProps = {
  width: "32px",
};

export default Spinner;
