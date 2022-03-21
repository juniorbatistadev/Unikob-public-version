import React, { useEffect, useState } from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Parse from "parse";
import styles from "./ReviewAvg.module.css";
import Rater from "../../../components/formikFields/Rater";

const ReviewAvg = ({ school }) => {
  const [avg, setAvg] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getSchoolAverageRating", {
        schoolId: school.id,
      });

      setReviews(result[0].total);
      setAvg(result[0].avg);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [school.id]);

  return (
    <FlexColumn className={styles.container}>
      <FlexColumn className={styles.box}>
        <p className={styles.avg}>{avg}</p>
        <Rater interactive={false} value={avg} />
        <p className={styles.text}>{reviews} reviews </p>
      </FlexColumn>
    </FlexColumn>
  );
};

export default ReviewAvg;
