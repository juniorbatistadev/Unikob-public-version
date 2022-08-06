import FlexColumn from "@components/common/FlexColumn";
import PostEditor from "../components/PostEditor";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import { useRouter } from "next/router";
import { READ_POST_PATH } from "src/paths";
import Alert from "@components/common/Alert";
import { updatePost } from "src/data/queryPosts";
import errorMessages from "src/parseErrorMessages";

function EditPostPage({ post }) {
  const { currentUser } = useContext(AuthContext);
  const { push } = useRouter();

  const handleSubmit = async (values) => {
    try {
      const params = {
        title: values.title,
        content: await values.content.save(),
        user: currentUser,
        post,
      };
      const result = await updatePost(params);
      localStorage.removeItem("editorSave");
      await push(READ_POST_PATH.replace(":slug", result.attributes.slug));
    } catch (error) {
      console.log(error.code);
      Alert.fire({
        icon: "error",
        text: `Hubo un error. ${
          error.code ? errorMessages[error.code] : error
        }`,
      });
    }
  };

  return (
    <FlexColumn margin="10px">
      <PostEditor action="edit" post={post} handleSubmit={handleSubmit} />
    </FlexColumn>
  );
}

export default EditPostPage;
