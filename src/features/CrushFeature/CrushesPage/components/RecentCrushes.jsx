import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getRecentCrushesWithPagination } from "src/data/queryCrushes";
import InfiniteScroll from "react-infinite-scroll-component";
import CrushFeedItem from "@pages/FeedPage/components/CrushFeedItem";
import EmptyIlustration from "@assets/icons/empty.svg";

const RecentCrushes = () => {
  const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
    {
      query: getRecentCrushesWithPagination,
      perPage: 10,
    }
  );

  return (
    <FlexColumn>
      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item) => (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <CrushFeedItem crush={item} />
          </FlexColumn>
        ))}
      </InfiniteScroll>
      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default RecentCrushes;
