import ChatPage from "@pages/MessagesFeature/ChatPage";
import Head from "next/head";
import withAuth from "src/helpers/withAuth";

function Chat() {
  return (
    <>
      <Head>
        <title>Chat - Unikob</title>
      </Head>
      <ChatPage />
    </>
  );
}

const WithAuthChat = withAuth(Chat);

export default WithAuthChat;
