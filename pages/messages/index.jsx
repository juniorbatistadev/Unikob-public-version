import MessagesLayout from "src/layouts/MessagesLayout";
import ConversationList from "@pages/MessagesFeature/components/ConversationList";
import EmptyLayout from "src/layouts/EmptyLayout";
import Head from "next/head";

function Messages() {
  return (
    <MessagesLayout onlyShowList={true}>
      <>
        <Head>
          <title>Chat - Unikob</title>
        </Head>
      </>
      <ConversationList />
    </MessagesLayout>
  );
}

Messages.layout = EmptyLayout;

export default Messages;
