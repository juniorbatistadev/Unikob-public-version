import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import PostHeader from "../components/PostHeader";
import CommentsSection from "@components/CommentsSection";
import LikePostButton from "../components/LikePostButton";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import FlexRow from "@components/common/FlexRow";
import ShareButtons from "@components/ShareButtons";
import useIsMounted from "src/hooks/useIsMounted";
import Button from "@components/common/Button";
import Alert from "@components/common/Alert";
import { deletePost } from "src/data/queryPosts";
import { useRouter } from "next/router";
import { EDIT_POST_PATH, FEED_PATH } from "src/paths";
import { POST_COMMENT } from "@components/CommentsSection/commentsType";

function ReadPostPage({ post }) {
  const { currentUser } = useContext(AuthContext);
  const { isMounted } = useIsMounted();
  const { push } = useRouter();

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await push(FEED_PATH);
      await deletePost(post.objectId);
    }
  };

  const onEdit = () => {
    push(EDIT_POST_PATH.replace(":slug", post.slug));
  };

  return (
    <FlexColumn>
      <PostHeader post={post} />
      <FlexColumn className={styles.content}>
        <RenderHTML json={post.content} />
      </FlexColumn>
      {isMounted && (
        <FlexColumn>
          <FlexRow className={styles.actionButtons}>
            {currentUser && <LikePostButton post={post} />}
            <ShareButtons
              title={post.title}
              text="Encontre esto en Gente Uni"
            />

            {currentUser && currentUser.id === post.createdBy.objectId && (
              <>
                <Button
                  typeStyle="secondary"
                  margin="0px 10px 0px 0px"
                  onClick={onEdit}
                >
                  Editar
                </Button>

                <Button typeStyle="secondary" onClick={onDelete}>
                  Borrar
                </Button>
              </>
            )}
          </FlexRow>
          <CommentsSection section={post.objectId} type={POST_COMMENT} />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ReadPostPage;
