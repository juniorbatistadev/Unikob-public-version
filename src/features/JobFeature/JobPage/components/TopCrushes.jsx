import Parse from "parse";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
// import SchoolRating from "./SchoolRating";
import { useEffect, useState } from "react";
import { getMembersWithMostCrushes } from "src/data/queryCrushes";
import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import DisplayUsername from "@components/common/DisplayUsername";
import Text from "@components/common/Text";

const TopCrushes = () => {
  const [crushes, setCrushes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getCrushRankingList");
      setCrushes(result);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {isLoading ? (
        <Spinner />
      ) : (
        crushes.map((user, index) => (
          <FlexColumn margin={"0px 0px 20px 0px"}>
            <FlexRow>
              <Avatar
                image={user.data.attributes.profilePicture?.url()}
                linkToUser={user.data.attributes.username}
              />

              <FlexColumn margin={"0px 0px 0px 10px"}>
                <DisplayUsername username={user} />
                <Text text={`${user.total} crushes recibidos`} />
              </FlexColumn>
            </FlexRow>
          </FlexColumn>
        ))
      )}
    </FlexColumn>
  );
};

export default TopCrushes;
