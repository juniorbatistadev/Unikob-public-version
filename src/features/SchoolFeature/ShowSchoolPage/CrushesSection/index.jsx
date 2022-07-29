import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getSchoolCrushesWithPagination } from "src/data/queryCrushes";
import InfiniteScroll from "react-infinite-scroll-component";
import CrushFeedItem from "@pages/FeedPage/components/CrushFeedItem";
import EmptyIlustration from "@assets/icons/empty.svg";

const CrushesSection = ({ school }) => {
  const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
    {
      query: getSchoolCrushesWithPagination,
      perPage: 10,
      queryData: school,
    }
  );

  return (
    <FlexColumn>
      <Title text="Crushes" />
      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item) => (
          <FlexColumn margin={"10px"}>
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

export default CrushesSection;
