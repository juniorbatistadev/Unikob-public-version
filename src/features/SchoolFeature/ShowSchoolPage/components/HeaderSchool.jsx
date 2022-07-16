import React from "react";
import styles from "./HeaderSchool.module.css";
import FlexColumn from "@components/common/FlexColumn";

const HeaderSchool = ({ text, image }) => {
  return (
    <FlexColumn className={styles.container}>
      <h1 className={styles.text}>{text}</h1>
    </FlexColumn>
  );
};

export default HeaderSchool;
