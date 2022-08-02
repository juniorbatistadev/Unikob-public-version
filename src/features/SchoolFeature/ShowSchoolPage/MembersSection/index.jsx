import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import UserListItem from "@components/UserListItem";
import EmptyIlustration from "@assets/icons/empty.svg";
import { getSchoolMembersWithPagination } from "src/data/querySchoolMembers";

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
      <Title text={`Miembros (${count})`} margin={"0px 0px 0px 10px"} />

      <FlexColumn margin={"15px 0px 0px 0px"}>
        <InfiniteScroll
          dataLength={items.length}
          loader={"Cargando"}
          hasMore={startFrom < count}
          next={nextPage}
        >
          {items.map((item) => (
            <UserListItem key={item.id} user={item.get("user")} />
          ))}
        </InfiniteScroll>
      </FlexColumn>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default MembersSection;
