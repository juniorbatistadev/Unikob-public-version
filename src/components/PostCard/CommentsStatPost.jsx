import React, { useState, useEffect } from "react";
import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import { getCommentsNumberBySectionId } from "src/data/queryComments";

const CommentsStatPost = ({ post }) => {
  console.log(post);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    getCommentsNumberBySectionId(post).then((data) => setComments(data));
  }, [post]);

  return (
    <FlexRow>
      <span role="img" aria-label="comment">
        📣
      </span>
      <Text text={`Comentarios (${comments})`} />
    </FlexRow>
  );
};

export default CommentsStatPost;
