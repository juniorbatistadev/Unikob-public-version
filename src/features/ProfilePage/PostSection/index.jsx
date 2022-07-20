import FlexColumn from "@components/common/FlexColumn";
import { getPostsWithPagination } from "src/data/queryPosts";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyIlustration from "@assets/icons/empty.svg";
import PostFeedItem from "@pages/FeedPage/components/PostFeedItem";

const PostSection = ({ user }) => {
  const { startFrom, count, items, isLoading, nextPage } = useInfiniteScrolling(
    {
      query: getPostsWithPagination,
      user: user,
      perPage: 10,
    }
  );

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {!isLoading && (
        <InfiniteScroll
          dataLength={items.length}
          start={0}
          next={nextPage}
          hasMore={startFrom < count}
          loader={"Cargando"}
        >
          {items.map((item) => (
            <FlexColumn margin={"0px 0px 5px 0px"}>
              <PostFeedItem key={item.id} post={item} />
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
