import { useContext } from "react";
import Title from "@components/common/Title";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getUserConversationsWithPagination } from "src/data/queryConversations";
import { AuthContext } from "src/contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyIlustration from "@assets/icons/empty.svg";
import ConversationPreview from "../ConversationPreview";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";

const ConversationList = () => {
  const { currentUser } = useContext(AuthContext);

  const { items, nextPage, count, startFrom, isLoading } = useInfiniteScrolling(
    {
      perPage: 10,
      query: getUserConversationsWithPagination,
      user: currentUser,
    }
  );

  return (
    <FlexColumn className={styles.container}>
      <Title text="Conversaciones" margin="10px 10px" />
      <InfiniteScroll
        hasMore={startFrom < count}
        next={nextPage}
        dataLength={items.length}
      >
        {items.map((item) => {
          return <ConversationPreview key={item.id} conversation={item} />;
        })}
      </InfiniteScroll>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
          <Text text="No tienes mensajes" fontSize="var(--text-base)" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default ConversationList;
