import React, { useState, useEffect } from "react";
import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import { getLikesNumberByPostId } from "src/data/queryPostLike";

const LikesPost = ({ post }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    getLikesNumberByPostId(post).then((data) => setLikes(data));
  }, [post]);

  return (
    <FlexRow>
      <span role="img" aria-label="heart">
        💙
      </span>
      <Text text={`Likes (${likes})`} />
    </FlexRow>
  );
};

export default LikesPost;
