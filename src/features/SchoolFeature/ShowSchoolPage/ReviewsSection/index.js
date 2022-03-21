import { useContext } from "react";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
// import FlexRow from "@components/common/FlexRow";
// import Button from "@components/common/Button";
// import ReviewForm from "./ReviewForm";
// import ReviewAvg from "./ReviewAvg";
// import { getReviewsWithPagination } from "src/data/querySchoolReview";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
// import InfiniteScroll from "react-infinite-scroller";
// import Review from "src/components/Review";
import EmptyIlustration from "@assets/icons/empty.svg";
import { AuthContext } from "src/contexts/AuthContext";

const ReviewsSection = ({ school }) => {
  // const { startFrom, isLoading, items, count, nextPage, reloadData } =
  //   useInfiniteScrolling({
  //     query: getReviewsWithPagination,
  //     queryData: school,
  //     perPage: 10,
  //   });
  const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  return (
    <div>
      <Title text="Reviews" margin="10px" />
      {/* <ReviewAvg school={school} />
      {currentUser ? (
        <ReviewForm school={school} reloadData={reloadData} />
      ) : (
        <FlexRow>
          <Button onClick={() => navigate("/")}>
            Inicia Sesion para dejar tu opinion
          </Button>
        </FlexRow>
      )}

      {!isLoading && (
        <InfiniteScroll
          loader={"Cargando"}
          hasMore={startFrom < count}
          loadMore={nextPage}
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
      )} */}

      {/* {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title
            text="Nadie ha dado su opinion aun. Se el primero !"
            fontSize="16px"
          />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )} */}
    </div>
  );
};

export default ReviewsSection;
