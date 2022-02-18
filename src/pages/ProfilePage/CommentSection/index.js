import React, { useContext } from "react";
// import AddProfileCommentForm from "./AddProfileCommentForm";
import Title from "@components/common/Title";
import InfiniteScroll from "react-infinite-scroller";
import Comment from "@components/Comment";
import Text from "@components/common/Text";
import EmptyIlustration from "@assets/icons/empty.svg";
import { AuthContext } from "src/contexts/AuthContext";
import FlexColumn from "@components/common/FlexColumn";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import { getCommentsWithPagination } from "src/data/queryComments";

const CommentSection = ({ user }) => {
  const { isLoading, items, reloadData, startFrom, count, nextPage } =
    useInfiniteScrolling({
      query: getCommentsWithPagination,
      user,
      perPage: 10,
    });

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Title text={`Comentarios (${count})`} margin="10px" />
      {currentUser ? (
        <p>Form</p>
      ) : (
        // <AddProfileCommentForm toUser={user} reloadComments={reloadData} />
        <Text text="Inicia Sesion o Registrate para poder comentar" />
      )}
      <FlexColumn>
        {isLoading ? (
          <Text text="Cargando..." />
        ) : (
          <InfiniteScroll
            pageStart={startFrom}
            hasMore={startFrom < count}
            loader={"Cargando..."}
            loadMore={nextPage}
          >
            {items.map((comment) => (
              <Comment
                margin="10px"
                key={comment.id}
                text={comment.attributes.text}
                user={comment.attributes.fromUser}
                date={comment.attributes.createdAt}
              />
            ))}
          </InfiniteScroll>
        )}
      </FlexColumn>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="Nadie ha comentado aun! 😥" fontSize="16px" />
          <Title text="Se el primero!😎 " fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </>
  );
};

export default CommentSection;
