import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { useEffect, useRef } from "react";
import {
  getChatMessagesWithPagination,
  subscribeToNewChatMessages,
} from "src/data/queryChatMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../components/Message";
import SendMessageForm from "../components/SendMessageForm";

import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";

export default function ChatPage() {
  //get Messages
  const { isLoading, items, nextPage, startFrom, count, addItemToStart } =
    useInfiniteScrolling({
      query: getChatMessagesWithPagination,
      perPage: 10,
    });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
      alignToTop: false,
    });
  };

  //show new messages
  useEffect(() => {
    const handleNewMessages = async () => {
      const sub = await subscribeToNewChatMessages();

      sub.on("create", (message) => {
        addItemToStart(message);
        scrollToBottom();
      });
    };

    handleNewMessages();
  }, []);

  return (
    <FlexColumn className={styles.container}>
      {isLoading ? (
        <FlexColumn className={styles.loader} alignItems="center">
          <Text text="Cargando chat..." />
          <Spinner width={30} />
        </FlexColumn>
      ) : (
        <>
          <div className={styles.messagesContainer} id="scrollableDiv">
            <InfiniteScroll
              className={styles.scroller}
              dataLength={items.length}
              hasMore={startFrom < count}
              next={nextPage}
              inverse={true}
              scrollableTarget="scrollableDiv"
              loader={<Spinner width={30} />}
            >
              <div ref={messagesEndRef} />

              {items.map((item, index) => (
                <Message message={item} key={index} withUsername={true} />
              ))}
            </InfiniteScroll>
          </div>
          <FlexColumn className={styles.chatFormContainer}>
            <SendMessageForm />
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  );
}
