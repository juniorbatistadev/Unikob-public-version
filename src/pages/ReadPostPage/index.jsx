import { useEffect, useContext } from "react";
import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import { AuthContext } from "@context/AuthContext";
import { saveView } from "src/data/queryPostView";
import PostHeader from "./components/PostHeader";
import Head from "next/head";
import extractTextFromPost from "src/helpers/extractTextFromPost";

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
      <Head>
        <title>{`${post.title} - GenteUni`}</title>
        <meta name="og:title" property="og:title" content={post.title} />
        <meta
          name="description"
          content={extractTextFromPost(post.content.blocks)}
        />
      </Head>
      <PostHeader post={post} />
      <FlexColumn className={styles.content}>
        <RenderHTML json={post.content} />
      </FlexColumn>
    </FlexColumn>
  );
}

export default ReadPostPage;
