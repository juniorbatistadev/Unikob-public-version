import Alert from "@components/common/Alert";
import { AuthContext } from "@context/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getConversationByMembers } from "src/data/queryConversations";
import { CONVERSATION_PATH } from "src/paths";
import Button from "@components/common/Button";
import SendMessageForm from "./SendFirstMessageForm";

const MessageButton = ({ toUser }) => {
  const { currentUser } = useContext(AuthContext);
  const { push } = useRouter();

  const handleClick = async () => {
    const conversation = await getConversationByMembers(currentUser, toUser);

    if (conversation) {
      push(CONVERSATION_PATH.replace(":conversation", conversation.id));
    } else {
      Alert.fire({
        html: <SendMessageForm toUser={toUser} />,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Button
      typeStyle="secondary"
      padding="5px 15px"
      margin="0px 10px 0px 0px"
      onClick={handleClick}
    >
      Hablar
    </Button>
  );
};

MessageButton.defaultProps = {
  pretext: "",
};

export default MessageButton;
