import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { useEffect } from "react";
import {
  getChatMessagesWithPagination,
  subscribeToNewChatMessages,
} from "src/data/queryChatMessage";
import InfiniteScroll from "react-infinite-scroller";
import Message from "../components/Message";
import SendMessageForm from "../components/SendMessageForm";

import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import { useRef } from "react";

export default function ChatPage() {
  //get Messages
  const { items, nextPage, startFrom, count, addItemToStart } =
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
      <div className={styles.messagesContainer}>
        <InfiniteScroll
          className={styles.scroller}
          hasMore={startFrom < count}
          loadMore={nextPage}
          useWindow={false}
          isReverse={true}
        >
          {items.map((item, index) => (
            <Message message={item} key={index} withUsername={true} />
          ))}
        </InfiniteScroll>
      </div>
      <FlexColumn className={styles.chatFormContainer}>
        <SendMessageForm />
      </FlexColumn>
    </FlexColumn>
  );
}
