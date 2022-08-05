import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import PostHeader from "../components/PostHeader";
import CommentsSection from "@components/CommentsSection";
import LikePostButton from "../components/LikePostButton";
import { useContext, useEffect, useState } from "react";
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
import SaveButton from "@components/SaveButton";
import { getUserRoles } from "src/data/queryRoles";

function ReadPostPage({ post }) {
  const { currentUser } = useContext(AuthContext);
  const { isMounted } = useIsMounted();
  const { push } = useRouter();
  const [userRoles, setUserRoles] = useState([]);

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await deletePost(post.objectId);
      await push(FEED_PATH);
    }
  };

  const onEdit = () => {
    push(EDIT_POST_PATH.replace(":slug", post.slug));
  };

  useEffect(() => {
    getUserRoles(currentUser).then((roles) => {
      const rolesNames = roles.map((role) => role.get("name"));
      setUserRoles(rolesNames);
    });
  }, [currentUser]);

  const canUserDelete = () => {
    return (
      currentUser?.id === post.createdBy.objectId ||
      userRoles.some((role) => ["admin", "moderator"].includes(role))
    );
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
            {currentUser && (
              <>
                <LikePostButton post={post} />
                <SaveButton
                  title={post.title}
                  type="post"
                  itemId={post.objectId}
                  typeClass="Post"
                />
              </>
            )}
            <ShareButtons
              title={post.title}
              text="Mire lo que encontré en Unikob "
            />

            {currentUser && currentUser.id === post.createdBy.objectId && (
              <Button typeStyle="secondary" onClick={onEdit}>
                Editar
              </Button>
            )}
            {canUserDelete() && (
              <Button typeStyle="secondary" onClick={onDelete}>
                Borrar
              </Button>
            )}
          </FlexRow>
          <FlexColumn margin={10}>
            <CommentsSection section={post.objectId} type={POST_COMMENT} />
          </FlexColumn>
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ReadPostPage;
