import { useEffect, useState } from "react";
import Parse from "parse";
import styles from "./ReviewAvgTeacher.module.css";
import ReviewAverageBox from "@components/ReviewsAverageBox";

const ReviewAvgTeacher = ({ teacher }) => {
  const [avg, setAvg] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getTeacherAverageRating", {
        teacherId: teacher.id,
      });

      setReviews(result[0].total);
      setAvg(result[0].avg);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [teacher.id]);

  return <ReviewAverageBox avg={avg} reviews={reviews} />;
};

export default ReviewAvgTeacher;
