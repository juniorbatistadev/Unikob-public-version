import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Text from "@components/common/Text";
import AddCommentForm from "./components/AddCommentForm";
import EmptyIlustration from "@assets/icons/empty.svg";
import { getCommentsWithPagination } from "src/data/queryComments";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./components/Comment";
import Spinner from "@components/common/Spinner";
import LoginToAccess from "@components/LoginToAccess";

const CommentSection = ({ section, type }) => {
  const { currentUser } = useContext(AuthContext);
  const { count, items, isLoading, startFrom, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getCommentsWithPagination,
      perPage: 10,
      queryData: section,
    });

  return (
    <div>
      <Title text={`Comentarios`} margin="0px 0px 10px 0px" />
      {currentUser ? (
        <AddCommentForm section={section} reloadData={reloadData} type={type} />
      ) : (
        <FlexColumn margin="0px 0px 20px 0px">
          <LoginToAccess text="Inicia Sesion para poder comentar" />
        </FlexColumn>
      )}
      <FlexColumn>
        {isLoading ? (
          <Spinner />
        ) : (
          <InfiniteScroll
            dataLength={items.length}
            hasMore={startFrom + 10 < count}
            next={nextPage}
            loader={<Spinner />}
          >
            {items.map((item) => (
              <Comment
                section={section}
                commentId={item.id}
                key={item.id}
                margin="0px 5px 10px 0px "
                date={item.attributes.createdAt}
                user={item.attributes.createdBy}
                text={item.attributes.text}
                reloadData={reloadData}
              />
            ))}
          </InfiniteScroll>
        )}
        {count < 1 && !isLoading && (
          <FlexColumn margin="auto" alignItems="center">
            <EmptyIlustration width="200px" height="200px" />
            <Title text="No hay comentarios" fontSize="var(--text-base)" />
          </FlexColumn>
        )}
      </FlexColumn>
    </div>
  );
};

export default CommentSection;
