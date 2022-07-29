import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";
import { AuthContext } from "@context/AuthContext";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFollowingFeedItemsWithPagination } from "src/data/queryFeed";
import FeedItem from "./FeedItem";
import Title from "@components/common/Title";
import EmptyIlustration from "@assets/icons/empty.svg";

function FollowingFeed() {
  const { currentUser } = useContext(AuthContext);
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getFollowingFeedItemsWithPagination,
      perPage: 15,
      user: currentUser,
    }
  );

  return (
    <FlexColumn>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={nextPage}
          hasMore={startFrom < count}
          loader={<Spinner />}
        >
          {items.map((item) => (
            <FeedItem key={item.id} feedItem={item} />
          ))}
        </InfiniteScroll>
      )}
      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
          <Title text="Nada que mostrar aqui" fontSize="16px" />
          <Title text="Empieza a seguir otros usuarios" fontSize="16px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default FollowingFeed;
