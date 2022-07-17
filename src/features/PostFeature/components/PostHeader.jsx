import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import styles from "./PostHeader.module.css";
import Moment from "react-moment";
import "moment/locale/es";
import Avatar from "@components/common/Avatar";
import ViewsPost from "@pages/FeedPage/components/PostFeedItem/ViewsPost";
import LikesPost from "@pages/FeedPage/components/PostFeedItem/LikesPost";
import CommentsStatPost from "@pages/FeedPage/components/PostFeedItem/CommentsStatPost";
import DisplayUsername from "@components/common/DisplayUsername";

export default function PostHeader({ post, preview }) {
  return (
    <header>
      <FlexColumn className={styles.header}>
        <Title
          level={1}
          text={post.title}
          fontSize="35px"
          margin="0px 0px 15px 0px"
          className={styles.title}
        />

        <FlexRow alignItems="center">
          <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
            {post.createdAt}
          </Moment>

          <Text text="|" />

          <FlexRow>
            <Avatar
              className={styles.avatar}
              width="25px"
              image={post.createdBy.profilePicture?.url}
            />
            <DisplayUsername username={post.createdBy.username} />
          </FlexRow>
        </FlexRow>
        {post.edited && <Text text="Editado" fontSize="14px" />}

        {!preview && (
          <FlexRow
            justifyContent="space-around"
            alignItems="center"
            margin="10px"
          >
            <FlexRow alignItems="center">
              <ViewsPost postInfoId={post.postInfo.objectId} />
            </FlexRow>
            <FlexRow alignItems="center">
              <LikesPost postId={post.objectId} />
            </FlexRow>
            <FlexRow alignItems="center">
              <CommentsStatPost post={post.objectId} />
            </FlexRow>
          </FlexRow>
        )}
      </FlexColumn>
    </header>
  );
}

PostHeader.defaultProps = {
  preview: false,
};
