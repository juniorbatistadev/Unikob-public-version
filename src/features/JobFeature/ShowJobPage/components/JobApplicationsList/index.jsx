import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getApplicationsWithPagination } from "src/data/queryJobApplication";
import Parse from "parse";
import Spinner from "@components/common/Spinner";
import EmptyIlustration from "@assets/icons/empty.svg";
import ApplicationItem from "./ApplicationItem";

function JobApplicationList({ jobId }) {
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getApplicationsWithPagination,
      queryData: jobId,
      perPage: 10,
    }
  );

  return (
    <FlexColumn>
      <Title text="Aplicaciones recibidas" margin={"10px 0px 10px 5px"} />
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
            <FlexColumn margin={"0px 5px 10px 5px"}>
              <ApplicationItem application={item} />
            </FlexColumn>
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

export default JobApplicationList;
