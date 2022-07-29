import Parse from "parse";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import SchoolRating from "./SchoolRating";
import { useEffect, useState } from "react";
import EmptyIlustration from "@assets/icons/empty.svg";

const SchoolsRanking = ({ country }) => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getSchoolRankingList", { country });
      setSchools(result);
      setIsLoading(false);
    };

    getData();
  }, [country]);

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {isLoading ? (
        <Spinner />
      ) : (
        schools.map((school, index) => (
          <SchoolRating
            school={school.schoolInfo}
            avg={school.avg}
            key={school.objectId}
            number={index + 1}
          />
        ))
      )}

      {schools.length < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default SchoolsRanking;
