import CommentSection from "@components/CommentsSection";
import FlexColumn from "@components/common/FlexColumn";

function ProfileCommentSection({ user }) {
  return (
    <FlexColumn>
      <CommentSection section={user.id} />
    </FlexColumn>
  );
}

export default ProfileCommentSection;
