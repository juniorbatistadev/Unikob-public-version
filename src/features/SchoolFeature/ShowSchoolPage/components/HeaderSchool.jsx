import React, { useEffect, useState } from "react";
import styles from "./HeaderSchool.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Parse from "parse";
import Rater from "@components/formikFields/Rater";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";

const HeaderSchool = ({ text, schoolId }) => {
  const [avg, setAvg] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getSchoolAverageRating", {
        schoolId,
      });

      setReviews(result[0].total);
      setAvg(result[0].avg);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [schoolId]);

  return (
    <FlexColumn className={styles.container}>
      <h1 className={styles.text}>{text}</h1>

      <FlexRow alignItems={"center"}>
        <Rater disabled={true} value={avg} />
        <Text text={`(${reviews})`} color={`var(--color-white)`} />
      </FlexRow>
    </FlexColumn>
  );
};

export default HeaderSchool;
