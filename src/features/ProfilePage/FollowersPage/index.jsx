import Title from "@components/common/Title";
import GoBackButton from "@components/common/GoBackButton";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getUserFollowersWithPagination } from "src/data/queryFollows";
import InfiniteScroll from "react-infinite-scroll-component";
import UserListItem from "@components/UserListItem";
import EmptyIlustration from "@assets/icons/empty.svg";
import styles from "./index.module.css";

const FollowingPage = ({ user }) => {
  const { count, items, isLoading, startFrom, nextPage } = useInfiniteScrolling(
    {
      query: getUserFollowersWithPagination,
      perPage: 10,
      user,
    }
  );

  return (
    <FlexColumn className={styles.container}>
      <FlexRow alignItems="center" margin="10px">
        <GoBackButton />
        <Title text={`Seguidores (${count})`} />
      </FlexRow>

      {user && isLoading ? (
        "Cargando"
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          hasMore={startFrom + 10 < count}
          lnext={nextPage}
          loader={"Cargando..."}
        >
          {items.map((item, index) => (
            <UserListItem key={item.id} user={item.attributes.fromUser} />
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

export default FollowingPage;
