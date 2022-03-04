import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import styles from "./index.module.css";
import LikesPost from "./LikesPost";
import ViewsPost from "./ViewsPost";
import Moment from "react-moment";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import CommentsStatPost from "./CommentsStatPost";
import A from "@components/common/A";
import { READ_POST_PATH } from "src/paths";
import extractFirstImageFromPost from "src/helpers/extractFirstImageFromPost";
import DisplayUsername from "@components/common/DisplayUsername";

const PostCard = ({ post }) => {
  const summary = extractTextFromPost(post.attributes.content.blocks, 160);
  const coverImage = extractFirstImageFromPost(post.attributes.content.blocks);

  return (
    <FlexColumn className={styles.header}>
      {coverImage && (
        <A href={READ_POST_PATH.replace(":slug", post.attributes.slug)}>
          <img
            src={coverImage}
            alt={post.attributes.title}
            height="150px"
            className={styles.cover}
          />
        </A>
      )}

      <FlexColumn margin="15px">
        <A href={READ_POST_PATH.replace(":slug", post.attributes.slug)}>
          <Title
            text={post.attributes.title}
            fontSize="25px"
            className={styles.title}
          />
        </A>

        <FlexRow alignItems="center" className={styles.bar}>
          <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
            {post.attributes.createdAt}
          </Moment>
          <Text text="|" />

          <FlexRow>
            <Avatar
              linkToUser={post.attributes.createdBy.attributes.username}
              className={styles.avatar}
              width="25px"
              image={post.attributes.createdBy.attributes.profilePicture?.url()}
            />
            <DisplayUsername
              username={post.attributes.createdBy.attributes.username}
            />
          </FlexRow>
        </FlexRow>
        <FlexRow>
          <A href={READ_POST_PATH.replace(":slug", post.attributes.slug)}>
            <Text text={summary.length > 159 ? summary + " ... " : summary} />
          </A>
        </FlexRow>
        <FlexRow
          justifyContent="space-around"
          alignItems="center"
          margin="10px"
        >
          <FlexRow alignItems="center">
            <ViewsPost postInfoId={post.attributes.postInfo.id} />
          </FlexRow>
          <FlexRow alignItems="center">
            <LikesPost postId={post.id} />
          </FlexRow>
          <FlexRow alignItems="center">
            <CommentsStatPost post={post.id} />
          </FlexRow>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
};

export default PostCard;
