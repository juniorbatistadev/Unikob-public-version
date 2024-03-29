import { useEffect, useState, useContext } from "react";
import {
  getMessagesWithPagination,
  subscribeToNewMessages,
} from "src/data/queryMessages";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import { getConversationById } from "src/data/queryConversations";
import { AuthContext } from "src/contexts/AuthContext";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import styles from "./index.module.css";
import SendMessageForm from "../components/SendMessageForm";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../components/Message";
import Parse from "parse";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import { useRouter } from "next/router";
import { PROFILE_PATH } from "src/paths";
import { useRef } from "react";
import Spinner from "@components/common/Spinner";

const ConversationPage = ({ conversation }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fromUser, setFromUser] = useState();
  const [currentConversation, setCurrentConversation] = useState();
  const { push } = useRouter();

  //get Messages
  const { items, nextPage, startFrom, count, addItemToStart } =
    useInfiniteScrolling({
      query: getMessagesWithPagination,
      queryData: conversation,
      perPage: 10,
    });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "start",
      inline: "end",
      behavior: "smooth",
      alignToTop: false,
    });
  };

  //show new messages
  useEffect(() => {
    const handleNewMessages = async () => {
      const sub = await subscribeToNewMessages({ queryData: conversation });

      sub.on("create", (message) => {
        addItemToStart(message);
        scrollToBottom();
      });
    };

    handleNewMessages();
  }, []);

  //Conversation info and mark messages as seen
  useEffect(() => {
    const getData = async () => {
      try {
        const conversationObj = await getConversationById(conversation);
        if (!conversationObj) {
          return;
        }

        const fromUser = conversationObj.attributes.members.filter(
          (member) => member.id !== currentUser.id
        );

        setFromUser(await fromUser[0].fetch());
        setCurrentConversation(conversationObj);

        Parse.Cloud.run("readAllMessages", {
          conversation: conversationObj.id,
        });

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getData();
  }, [conversation, currentUser?.id]);

  if (!isLoading && !currentConversation)
    return (
      <FlexColumn margin="auto">
        <Text text="No se encontro esta conversacion." />
      </FlexColumn>
    );

  return (
    <FlexColumn className={styles.container}>
      <FlexRow alignItems="center" className={styles.header}>
        <GoBackButton fill={"var(--color-gray-100)"} margin={0} />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Avatar
              width={40}
              className={styles.avatar}
              image={fromUser.attributes.profilePicture?.url()}
              linkToUser={fromUser.attributes.username}
            />
            <Title
              className={styles.chatHeaderTitle}
              margin="0px 0px 0px 10px"
              text={fromUser.attributes.username}
              onClick={() =>
                push(
                  PROFILE_PATH.replace(":user", fromUser.attributes.username)
                )
              }
            />
          </>
        )}
      </FlexRow>
      <div className={styles.messagesContainer} id="scrollableDiv">
        <InfiniteScroll
          className={styles.scroller}
          dataLength={items.length}
          hasMore={startFrom < count}
          next={nextPage}
          inverse={true}
          scrollableTarget="scrollableDiv"
          loader={<Spinner width={40} />}
        >
          <div ref={messagesEndRef} />

          {items.map((item, index) => (
            <Message message={item} key={index} />
          ))}
        </InfiniteScroll>
      </div>

      <FlexColumn className={styles.chatFormContainer}>
        {!isLoading && <SendMessageForm conversation={currentConversation} />}
      </FlexColumn>
    </FlexColumn>
  );
};

export default ConversationPage;
