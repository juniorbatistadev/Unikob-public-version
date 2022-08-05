import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import { useEffect, useState } from "react";
import { getViewsNumberByPostId } from "src/data/queryPostInfo";

const ViewsPost = ({ postInfoId }) => {
  const [views, setViews] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getViewsNumberByPostId(postInfoId);

      setViews(data);
    };

    getData().finally(() => setLoading(false));
  }, [postInfoId]);

  return (
    <FlexRow alignItems="center">
      <span role="img" aria-label="Eyes">
        👀
      </span>
      {!loading && <Text text={`Views (${views ?? 0})`} />}
    </FlexRow>
  );
};

export default ViewsPost;
