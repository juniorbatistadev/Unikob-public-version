import Title from "@components/common/Title";
import InfiniteScroll from "react-infinite-scroller";
import Gift from "./Gift";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import EmptyIlustration from "@assets/icons/empty.svg";
import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { getUserGiftsWithPagination } from "src/data/queryGifts";
import Spinner from "@components/common/Spinner";

function GiftSection({ user }) {
  const { startFrom, count, nextPage, items, isLoading } = useInfiniteScrolling(
    {
      query: getUserGiftsWithPagination,
      user,
      perPage: 10,
    }
  );

  console.log(items);

  return (
    <>
      <Title text={`Regalos (${count})`} margin="10px"></Title>
      {isLoading ? (
        <Text text="Cargando..." />
      ) : (
        <InfiniteScroll
          hasMore={startFrom < count}
          loadMore={nextPage}
          loader={<Spinner />}
        >
          <div className={styles.giftsContainer}>
            {items.map((gift) => (
              <Gift
                key={gift.id}
                image={gift.attributes.gift.attributes.image?.url()}
                fromUser={gift.attributes.fromUser}
                name={gift.attributes.gift.attributes.name}
                message={gift.attributes.message}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </>
  );
}

export default GiftSection;
