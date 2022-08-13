import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyIlustration from "@assets/icons/empty.svg";
import Spinner from "@components/common/Spinner";
import { getUserFeedItemsWithPagination } from "src/data/queryFeed";
import FeedItem from "@pages/FeedPage/FeedItem";

const PostSection = ({ user }) => {
  const { startFrom, count, items, isLoading, nextPage } = useInfiniteScrolling(
    {
      query: getUserFeedItemsWithPagination,
      user: user,
      perPage: 10,
    }
  );

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          start={0}
          next={nextPage}
          hasMore={startFrom < count}
          loader={"Cargando"}
        >
          {items.map((item, index) => (
            <FlexColumn key={index}>
              <FeedItem key={item.id} feedItem={item} />
            </FlexColumn>
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="60px auto auto auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default PostSection;
