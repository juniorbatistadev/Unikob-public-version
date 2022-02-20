import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import styles from "./PostHeader.module.css";
import Moment from "react-moment";
import "moment/locale/es";
import Avatar from "@components/common/Avatar";
import A from "@components/common/A";
import ViewsPost from "@components/Post/ViewsPost";
import LikesPost from "@components/Post/LikesPost";

export default function PostHeader({ post }) {
  return (
    <header>
      <FlexColumn className={styles.header}>
        <Title
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
          <A href={`/profile/${post.byUser.objectId}`}>
            <FlexRow>
              <Avatar
                className={styles.avatar}
                width="25px"
                image={post.byUser.profilePicture}
              />
              <Text
                className={styles.usernameText}
                text={`@${post.byUser.username}`}
              />
            </FlexRow>
          </A>
        </FlexRow>
        <FlexRow
          justifyContent="space-around"
          alignItems="center"
          margin="10px"
        >
          <FlexRow alignItems="center">
            <ViewsPost post={post.id} />
          </FlexRow>
          <FlexRow alignItems="center">
            <LikesPost post={post.id} />
          </FlexRow>
          <FlexRow alignItems="center">
            {/* <CommentsStatPost post={post} /> */}
          </FlexRow>
        </FlexRow>
      </FlexColumn>
    </header>
  );
}
