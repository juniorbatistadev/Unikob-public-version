import React from "react";
import ArrowIcon from "@assets/icons/left-arrow.svg";
import FlexRow from "@components/common/FlexRow";
import styles from "./GoBackButton.module.css";
import { useRouter } from "next/router";

const GoBackButton = () => {
  const { back } = useRouter();

  return (
    <FlexRow
      onClick={() => back()}
      margin="10px"
      alignItems="center"
      className={styles.button}
    >
      <ArrowIcon width="35px" fill="#4875b2" />
    </FlexRow>
  );
};

export default GoBackButton;
