import { useRouter } from "next/router";
import EmptyLayout from "src/layouts/EmptyLayout";
import MessagesLayout from "src/layouts/MessagesLayout";

function Conversation() {
  const router = useRouter();
  const { conversation } = router.query;

  return <>{conversation && <MessagesLayout conversation={conversation} />}</>;
}

Conversation.layout = EmptyLayout;

export default Conversation;
