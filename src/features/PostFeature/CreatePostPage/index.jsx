import PostEditor from "../components/PostEditor";
import FlexColumn from "@components/common/FlexColumn";
import { savePost } from "src/data/queryPosts";
import Alert from "@components/common/Alert";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import { useRouter } from "next/router";
import { READ_POST_PATH } from "src/paths";
import errorMessages from "src/parseErrorMessages";

function CreatePostPage() {
  const { currentUser } = useContext(AuthContext);
  const { push } = useRouter();

  const handleSubmit = async (values) => {
    try {
      const params = {
        title: values.title,
        content: await values.content.save(),
        user: currentUser,
      };
      const result = await savePost(params);
      localStorage.removeItem("editorSave");
      await push(READ_POST_PATH.replace(":slug", result.attributes.slug));
    } catch (error) {
      Alert.fire({
        icon: "error",
        text: `Hubo un error. ${
          error.code ? errorMessages[error.code] : error
        }`,
      });
    }
  };

  return (
    <FlexColumn margin="10px 0px 0px 0px">
      <PostEditor action="create" handleSubmit={handleSubmit} />
    </FlexColumn>
  );
}

export default CreatePostPage;
