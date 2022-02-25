import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import styles from "./index.module.css";
// import CommentsStatPost from "./CommentsStatPost";
import LikesPost from "./LikesPost";
import ViewsPost from "./ViewsPost";
import Moment from "react-moment";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import { useRouter } from "next/router";
import CommentsStatPost from "./CommentsStatPost";

const PostCard = ({ post }) => {
  const { push } = useRouter();

  const navigate = (test) => push(test);

  return (
    <FlexColumn
      className={styles.header}
      onClick={() => navigate("/post/" + post.id)}
    >
      <Title
        text={post.attributes.title}
        fontSize="25px"
        className={styles.title}
      />
      <FlexRow alignItems="center">
        <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
          {post.attributes.createdAt}
        </Moment>
        <Text text="|" />
        <Avatar
          onClick={() => navigate("/profile/" + post.attributes.byUser.id)}
          className={styles.avatar}
          width="25px"
          image={post.attributes.byUser.attributes.profilePicture?.url()}
        />
        <Text
          className={styles.usernameText}
          text={`@${post.attributes.byUser.attributes.username}`}
          onClick={() => navigate("/profile/" + post.attributes.byUser.id)}
        />
      </FlexRow>
      <FlexRow>
        <Text text={extractTextFromPost(post.attributes.content.blocks)} />
      </FlexRow>
      <FlexRow justifyContent="space-around" alignItems="center" margin="10px">
        <FlexRow alignItems="center">
          <ViewsPost views={post.attributes.views} />
        </FlexRow>
        <FlexRow alignItems="center">
          <LikesPost postId={post.id} />
        </FlexRow>
        <FlexRow alignItems="center">
          <CommentsStatPost post={post.id} />
        </FlexRow>
      </FlexRow>
    </FlexColumn>
  );
};

export default PostCard;
