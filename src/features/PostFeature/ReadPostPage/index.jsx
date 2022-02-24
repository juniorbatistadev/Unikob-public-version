import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import PostHeader from "../components/PostHeader";
import Head from "next/head";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import CommentsSection from "@components/CommentsSection";
import LikePostButton from "../components/LikePostButton";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import FlexRow from "@components/common/FlexRow";
import ShareButtons from "@components/ShareButtons";
import useIsMounted from "src/hooks/useIsMounted";

function ReadPostPage({ post }) {
  const { currentUser } = useContext(AuthContext);
  const { isMounted } = useIsMounted();
  return (
    <FlexColumn>
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
      <FlexColumn>
        <FlexRow className={styles.actionButtons}>
          {currentUser && <LikePostButton post={post} />}
          {isMounted && (
            <ShareButtons
              title={post.title}
              text="Encontre esto en Gente Uni"
            />
          )}
        </FlexRow>
        <CommentsSection section={post.objectId} />
      </FlexColumn>
    </FlexColumn>
  );
}

export default ReadPostPage;