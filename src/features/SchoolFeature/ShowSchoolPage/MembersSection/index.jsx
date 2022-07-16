import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { getSchoolMembersWithPagination } from "src/data/querySchools";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@components/common/Spinner";
import UserListItem from "@components/UserListItem";
import EmptyIlustration from "@assets/icons/empty.svg";

const MembersSection = ({ school }) => {
  const { items, startFrom, count, nextPage, isLoading } = useInfiniteScrolling(
    {
      query: getSchoolMembersWithPagination,
      perPage: 10,
      queryData: school,
    }
  );

  return (
    <FlexColumn>
      <Title text={`Miembros (${count})`} margin="10px" />

      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item) => (
          <UserListItem key={item.id} user={item} />
        ))}
      </InfiniteScroll>
      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default MembersSection;
