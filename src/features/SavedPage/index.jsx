import { useRouter } from "next/router";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import { getSavedsWithPagination } from "src/data/querySaves";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import Spinner from "@components/common/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import SavedItem from "./components/SavedItem";
import EmptyIlustration from "@assets/icons/empty.svg";

function SavedPage() {
  const { currentUser } = useContext(AuthContext);
  const { startFrom, isLoading, items, count, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getSavedsWithPagination,
      user: currentUser,
      perPage: 10,
    });

  return (
    <FlexColumn>
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Guardados" />
      </FlexRow>

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
            <FlexColumn key={item.id} margin="0px 10px 10px 10px">
              <SavedItem item={item} />
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

export default SavedPage;
