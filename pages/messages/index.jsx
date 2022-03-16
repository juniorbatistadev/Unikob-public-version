import MessagesLayout from "src/layouts/MessagesLayout";
import ConversationList from "@pages/MessagesFeature/components/ConversationList";
import EmptyLayout from "src/layouts/EmptyLayout";

function Messages() {
  return (
    <MessagesLayout onlyShowList={true}>
      <ConversationList />
    </MessagesLayout>
  );
}

Messages.layout = EmptyLayout;

export default Messages;
