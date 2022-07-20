import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import SchoolRating from "./SchoolRating";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRecentSchoolsWithPagination } from "src/data/querySchools";

const RecentSchools = ({ country }) => {
  const { startFrom, isLoading, items, count, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getRecentSchoolsWithPagination,
      queryData: country,
      perPage: 10,
    });

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          loader={"Cargando"}
          hasMore={startFrom < count}
          next={nextPage}
        >
          {items.map((item) => (
            <SchoolRating school={item} key={item.objectId} />
          ))}
        </InfiniteScroll>
      )}
    </FlexColumn>
  );
};

export default RecentSchools;
