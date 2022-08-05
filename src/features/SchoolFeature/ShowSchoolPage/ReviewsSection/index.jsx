import { useContext } from "react";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import ReviewForm from "./ReviewForm";
import ReviewAvg from "./ReviewAvg";
import { getReviewsWithPagination } from "src/data/querySchoolReview";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "src/components/Review";
import EmptyIlustration from "@assets/icons/empty.svg";
import { AuthContext } from "src/contexts/AuthContext";
import useIsMounted from "@hooks/useIsMounted";
import styles from "./index.module.css";
import LoginToAccess from "@components/LoginToAccess";

const ReviewsSection = ({ school }) => {
  const { startFrom, isLoading, items, count, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getReviewsWithPagination,
      queryData: school,
      perPage: 10,
    });

  const { currentUser } = useContext(AuthContext);

  const { isMounted } = useIsMounted();

  return (
    <FlexColumn>
      <Title text="Reviews" margin={"0px 0px 0px 10px"} />
      <FlexRow className={styles.topHeader}>
        <FlexColumn className={styles.avgContainer}>
          <ReviewAvg school={school} />
        </FlexColumn>
        <FlexColumn className={styles.formContainer}>
          {isMounted && currentUser ? (
            <ReviewForm school={school} reloadData={reloadData} />
          ) : (
            <FlexRow>
              <LoginToAccess text={"Inicia sesion para dejar un review"} />
            </FlexRow>
          )}
        </FlexColumn>
      </FlexRow>

      {!isLoading && (
        <InfiniteScroll
          dataLength={items.length}
          loader={"Cargando"}
          hasMore={startFrom < count}
          next={nextPage}
        >
          {items.map((item) => (
            <Review
              margin="10px"
              key={item.id}
              rating={item.attributes.rating}
              date={item.attributes.createdAt}
              text={item.attributes.description}
              user={item.attributes.createdBy}
            />
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default ReviewsSection;
