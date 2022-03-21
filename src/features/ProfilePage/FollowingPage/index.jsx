import Title from "@components/common/Title";
import GoBackButton from "@components/common/GoBackButton";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getUserFollowingsWithPagination } from "src/data/queryFollows";
import InfiniteScroll from "react-infinite-scroll-component";
import UserListItem from "@components/UserListItem";
import EmptyIlustration from "@assets/icons/empty.svg";
import styles from "./index.module.css";

const FollowersPage = ({ user }) => {
  const { count, items, isLoading, startFrom, nextPage } = useInfiniteScrolling(
    {
      query: getUserFollowingsWithPagination,
      perPage: 10,
      user,
    }
  );

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text={`Siguiendo (${count})`} />
      </FlexRow>

      {user && isLoading ? (
        "Cargando"
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          hasMore={startFrom + 10 < count}
          next={nextPage}
          loader={"Cargando..."}
        >
          {items.map((item, index) => (
            <UserListItem key={item.id} user={item.attributes.toUser} />
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn margin="auto" alignItems="center">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default FollowersPage;
