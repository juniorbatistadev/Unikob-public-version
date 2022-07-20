import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";
import { AuthContext } from "@context/AuthContext";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getFeedItemsWithPagination,
  getFollowingFeedItemsWithPagination,
} from "src/data/queryFeed";
import FeedItem from "./FeedItem";

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
    </FlexColumn>
  );
}

export default FollowingFeed;
