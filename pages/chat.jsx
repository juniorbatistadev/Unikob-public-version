import ChatPage from "@pages/MessagesFeature/ChatPage";
import withAuth from "src/helpers/withAuth";

function Chat() {
  return <ChatPage />;
}

export default withAuth(Chat);
