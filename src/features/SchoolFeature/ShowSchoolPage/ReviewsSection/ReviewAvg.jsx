import { useEffect, useState } from "react";
import Parse from "parse";
import ReviewAverageBox from "@components/ReviewsAverageBox";

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

  return <ReviewAverageBox avg={avg} reviews={reviews} />;
};

export default ReviewAvg;
