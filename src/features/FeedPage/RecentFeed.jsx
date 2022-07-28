import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFeedItemsWithPagination } from "src/data/queryFeed";
import FeedItem from "./FeedItem";

function RecentFeed() {
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getFeedItemsWithPagination,
      perPage: 15,
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
            <FlexColumn margin={"20px 0px"}>
              <FeedItem key={item.id} feedItem={item} />
            </FlexColumn>
          ))}
        </InfiniteScroll>
      )}
    </FlexColumn>
  );
}

export default RecentFeed;
