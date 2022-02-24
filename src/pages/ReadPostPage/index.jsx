import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import PostHeader from "./components/PostHeader";
import Head from "next/head";
import extractTextFromPost from "src/helpers/extractTextFromPost";

function ReadPostPage({ post }) {
  return (
    <FlexColumn className={styles.container}>
      <Head>
        <title>{`${post.title} - GenteUni`}</title>
        <meta name="og:title" property="og:title" content={post.title} />
        <meta
          name="description"
          content={extractTextFromPost(post.content.blocks, true)}
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
