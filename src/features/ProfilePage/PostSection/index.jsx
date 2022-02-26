import FlexColumn from "@components/common/FlexColumn";
import { getPostsWithPagination } from "src/data/queryPosts";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import EmptyIlustration from "@assets/icons/empty.svg";
import PostCard from "@components/PostCard";

const PostSection = ({ user }) => {
  const { startFrom, count, items, isLoading, nextPage } = useInfiniteScrolling(
    {
      query: getPostsWithPagination,
      user: user,
      perPage: 10,
    }
  );

  return (
    <>
      {!isLoading && (
        <InfiniteScroll
          start={0}
          loadMore={nextPage}
          hasMore={startFrom < count}
          loader={"Cargando"}
        >
          {items.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="60px auto auto auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </>
  );
};

export default PostSection;
