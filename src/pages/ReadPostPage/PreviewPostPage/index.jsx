import { useEffect, useContext, useState } from "react";
import FlexColumn from "@components/common/FlexColumn";
import RenderHTML from "@components/RenderHTML";
import styles from "./index.module.css";
import { AuthContext } from "@context/AuthContext";
import PostHeader from "../components/PostHeader";
import useIsMounted from "src/hooks/useIsMounted";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import { CREATE_POST_PATH } from "src/paths";
import { useRouter } from "next/router";

function PreviewPostPage() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isMounted } = useIsMounted();
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isMounted) {
      const data = JSON.parse(localStorage.getItem("editorSave"));

      if (!data) {
        router.replace(CREATE_POST_PATH);
        return;
      }

      data.byUser = currentUser.attributes;

      setPost(data);
      setIsLoading(false);
    }
  }, [isMounted]);

  return (
    <FlexColumn className={styles.container}>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Volver al editor" />
      </FlexRow>
      {isMounted && post && (
        <>
          <PostHeader post={post} preview={true} />
          <FlexColumn className={styles.content}>
            <RenderHTML json={post} />
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  );
}

export default PreviewPostPage;
