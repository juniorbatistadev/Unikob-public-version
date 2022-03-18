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

      console.log(sub);

      sub.on("create", (message) => {
        console.log(message);
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
      <SendMessageForm />
    </FlexColumn>
  );
}
