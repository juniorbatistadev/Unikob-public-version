import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
// import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
// import { getCrushesWithPagination } from "src/data/queryCrushes";
// import InfiniteScroll from "react-infinite-scroller";
// import Spinner from "@components/common/Spinner";
// import CrushHeader from "@components/CrushHeader";

const CrushesSection = ({ school }) => {
  // const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
  //   {
  //     query: getCrushesWithPagination,
  //     perPage: 10,
  //     user: school,
  //   }
  // );

  return (
    <FlexColumn>
      <Title text="UniCrush" margin="10px" />

      {/* <InfiniteScroll
        loadMore={nextPage}
        loader={<Spinner />}
        hasMore={startFrom < count}
      >
        {items.map((item) => (
          <CrushHeader crush={item} listItem={true} key={item.id} />
        ))}
      </InfiniteScroll>

      {!isLoading && count < 1 && <p>No hay trabajos disponibles</p>} */}
    </FlexColumn>
  );
};

export default CrushesSection;
