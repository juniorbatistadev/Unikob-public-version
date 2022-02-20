import { useState, useEffect } from "react";
import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import { getViewsNumberByPostId } from "src/data/queryPostView";

const ViewsPost = ({ post }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    getViewsNumberByPostId(post).then((data) => setViews(data));
  }, [post]);

  return (
    <FlexRow>
      <span role="img" aria-label="Eyes">
        👀
      </span>
      <Text text={`Views (${views})`} />
    </FlexRow>
  );
};

export default ViewsPost;
