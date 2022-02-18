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
import CommentsList from "./CommentsList";

const CommentsSection = ({ owner }) => {
  console.log();
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Title text={`Comentarios `} margin="10px" />
      {currentUser ? (
        <p>Form</p>
      ) : (
        // <AddProfileCommentForm toUser={user} reloadComments={reloadData} />
        <Text text="Inicia Sesion o Registrate para poder comentar" />
      )}
      <FlexColumn>
        <CommentsList />
      </FlexColumn>
    </>
  );
};

export default CommentsSection;
