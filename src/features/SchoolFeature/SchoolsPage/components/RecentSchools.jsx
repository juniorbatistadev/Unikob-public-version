import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import SchoolRating from "./SchoolRating";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRecentSchoolsWithPagination } from "src/data/querySchools";
import EmptyIlustration from "@assets/icons/empty.svg";

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

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default RecentSchools;
