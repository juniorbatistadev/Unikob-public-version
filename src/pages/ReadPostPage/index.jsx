import { useEffect, useContext } from "react";
import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import { AuthContext } from "@context/AuthContext";
import { saveView } from "src/data/queryPostView";
import PostHeader from "./components/PostHeader";

function ReadPostPage({ post }) {
  const { currentUser } = useContext(AuthContext);

  // add view to post
  // useEffect(() => {
  //   if (currentUser && currentUser.id !== post.byUser.id) {
  //     console.log(currentUser, post.byUser.objectId);
  //     saveView(currentUser, post);
  //   }
  // }, [post, currentUser]);

  return (
    <FlexColumn className={styles.container}>
      <PostHeader post={post} />
      <FlexColumn className={styles.content}>
        <RenderHTML json={post.content} />
      </FlexColumn>
    </FlexColumn>
  );
}

export default ReadPostPage;
