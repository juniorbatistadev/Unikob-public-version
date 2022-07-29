import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import FeedItem from "@pages/FeedPage/FeedItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSchoolFeedItemsWithPagination } from "src/data/queryFeed";
import EmptyIlustration from "@assets/icons/empty.svg";

function FeedSection({ school }) {
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getSchoolFeedItemsWithPagination,
      perPage: 15,
      queryData: school,
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
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default FeedSection;
