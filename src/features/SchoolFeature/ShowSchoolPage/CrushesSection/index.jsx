import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getCrushesWithPagination } from "src/data/queryCrushes";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@components/common/Spinner";
import CrushFeedItem from "@pages/FeedPage/components/CrushFeedItem";
// import CrushHeader from "@components/CrushHeader";

const CrushesSection = ({ school }) => {
  const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
    {
      query: getCrushesWithPagination,
      perPage: 10,
      user: school,
    }
  );

  return (
    <FlexColumn>
      <Title text="UniCrush" margin="10px" />

      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item) => (
          <CrushFeedItem crush={item} />
        ))}
      </InfiniteScroll>

      {!isLoading && count < 1 && <p>No hay ningun crush</p>}
    </FlexColumn>
  );
};

export default CrushesSection;
