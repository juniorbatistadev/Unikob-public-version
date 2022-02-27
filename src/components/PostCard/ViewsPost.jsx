import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import { useEffect, useState } from "react";
import { getViewsNumberByPostId } from "src/data/queryPostInfo";

const ViewsPost = ({ postInfoId }) => {
  const [views, setViews] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await getViewsNumberByPostId(postInfoId);

      setViews(data);
    };

    getData();
  }, [postInfoId]);

  return (
    <FlexRow alignItems="center">
      <span role="img" aria-label="Eyes">
        👀
      </span>
      {views && <Text text={`Views (${views ?? 0})`} />}
    </FlexRow>
  );
};

export default ViewsPost;
