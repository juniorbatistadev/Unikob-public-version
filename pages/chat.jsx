import ChatPage from "@pages/MessagesFeature/ChatPage";
import withAuth from "src/helpers/withAuth";
import EmptyLayout from "src/layouts/EmptyLayout";

function Chat() {
  return <ChatPage />;
}

const WithAuthChat = withAuth(Chat);

// WithAuthChat.layout = EmptyLayout;

export default WithAuthChat;
