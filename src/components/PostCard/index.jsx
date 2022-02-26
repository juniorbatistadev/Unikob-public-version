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
import { PROFILE_PATH, READ_POST_PATH } from "src/paths";
import extractFirstImageFromPost from "src/helpers/extractFirstImageFromPost";

const PostCard = ({ post }) => {
  const summary = extractTextFromPost(post.attributes.content.blocks, 160);
  const coverImage = extractFirstImageFromPost(post.attributes.content.blocks);

  console.log(coverImage);

  return (
    <FlexColumn className={styles.header}>
      <A href={READ_POST_PATH.replace(":slug", post.attributes.slug)}>
        {coverImage && (
          <img src={coverImage} height="150px" className={styles.cover} />
        )}
        <FlexColumn margin="15px">
          <Title
            text={post.attributes.title}
            fontSize="25px"
            className={styles.title}
          />
          <FlexRow alignItems="center" className={styles.bar}>
            <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
              {post.attributes.createdAt}
            </Moment>
            <Text text="|" />
            <A
              href={PROFILE_PATH.replace(
                ":user",
                post.attributes.createdBy.attributes.username
              )}
            >
              <FlexRow>
                <Avatar
                  linkToUser={post.attributes.createdBy.attributes.username}
                  className={styles.avatar}
                  width="25px"
                  image={post.attributes.createdBy.attributes.profilePicture?.url()}
                />
                <Text
                  className={styles.usernameText}
                  text={`@${post.attributes.createdBy.attributes.username}`}
                />
              </FlexRow>
            </A>
          </FlexRow>
          <FlexRow>
            <Text text={summary.length > 159 ? summary + " ... " : summary} />
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
      </A>
    </FlexColumn>
  );
};

export default PostCard;
