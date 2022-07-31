import CommentSection from "@components/CommentsSection";
import { PROFILE_COMMENT } from "@components/CommentsSection/commentsType";
import FlexColumn from "@components/common/FlexColumn";

function ProfileCommentSection({ user }) {
  return (
    <FlexColumn margin="15px 10px">
      <CommentSection section={user.id} type={PROFILE_COMMENT} />
    </FlexColumn>
  );
}

export default ProfileCommentSection;
