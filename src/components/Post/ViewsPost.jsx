import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";

const ViewsPost = ({ views }) => {
  return (
    <FlexRow alignItems="center">
      <span role="img" aria-label="Eyes">
        👀
      </span>
      <Text text={`Views (${views ?? 0})`} />
    </FlexRow>
  );
};

export default ViewsPost;
