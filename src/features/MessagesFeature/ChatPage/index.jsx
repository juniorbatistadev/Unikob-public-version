import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { useEffect } from "react";
import {
  getChatMessagesWithPagination,
  subscribeToNewChatMessages,
} from "src/data/queryChatMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../components/Message";
import SendMessageForm from "../components/SendMessageForm";

import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";

export default function ChatPage() {
  //get Messages
  const { isLoading, items, nextPage, startFrom, count, addItemToStart } =
    useInfiniteScrolling({
      query: getChatMessagesWithPagination,
      perPage: 10,
    });

  //show new messages
  useEffect(() => {
    const handleNewMessages = async () => {
      const sub = await subscribeToNewChatMessages();

      sub.on("create", (message) => {
        addItemToStart(message);
      });
    };

    handleNewMessages();
  }, []);

  return (
    <FlexColumn className={styles.container}>
      {!isLoading && (
        <>
          <div className={styles.messagesContainer} id="scrollableDiv">
            <InfiniteScroll
              className={styles.scroller}
              dataLength={items.length}
              hasMore={startFrom < count}
              next={nextPage}
              inverse={true}
              scrollableTarget="scrollableDiv"
            >
              {items.map((item, index) => (
                <Message message={item} key={index} withUsername={true} />
              ))}
            </InfiniteScroll>
          </div>
        </>
      )}

      <FlexColumn className={styles.chatFormContainer}>
        <SendMessageForm />
      </FlexColumn>
    </FlexColumn>
  );
}
