import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Text from "@components/common/Text";
import AddCommentForm from "./components/AddCommentForm";
import EmptyIlustration from "@assets/icons/empty.svg";
import { getCommentsWithPagination } from "src/data/queryComments";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Comment from "./components/Comment";

const CommentSection = ({ section }) => {
  const { currentUser } = useContext(AuthContext);
  const { count, items, isLoading, startFrom, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getCommentsWithPagination,
      perPage: 10,
      queryData: section,
    });

  return (
    <div>
      <Title text={`Comentarios (${count})`} margin="0px 0px 10px 0px" />
      {currentUser ? (
        <AddCommentForm section={section} reloadData={reloadData} />
      ) : (
        <Text text="Inicia Sesion o Registrate para poder comentar" />
      )}
      <FlexColumn>
        {isLoading ? (
          "Cargando"
        ) : (
          <InfiniteScroll
            hasMore={startFrom + 10 < count}
            loadMore={nextPage}
            loader={"Cargando..."}
          >
            {items.map((item) => (
              <Comment
                section={section}
                commentId={item.id}
                key={item.id}
                margin="10px 5px "
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
            <Title text="No hay Comentarios" fontSize="16px" />
          </FlexColumn>
        )}
      </FlexColumn>
    </div>
  );
};

export default CommentSection;
