import { useContext, useState } from "react";
import Avatar from "@components/common/Avatar";
import styles from "./index.module.css";
import Moment from "react-moment";
import "moment/locale/es";
import { motion } from "framer-motion";
import FlexRow from "@components/common/FlexRow";
import AddCommentForm from "../AddCommentForm";
import FlexColumn from "@components/common/FlexColumn";
import {
  deleteComment,
  getSubCommentsWithPagination,
} from "src/data/queryComments";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { AuthContext } from "@context/AuthContext";
import { RESPONSE_COMMENT } from "@components/CommentsSection/commentsType";
import DisplayUsername from "@components/common/DisplayUsername";

const Comment = ({
  text,
  user,
  date,
  margin,
  style,
  commentId,
  section,
  parentComment,
  reloadData: reloadParent,
}) => {
  const [isRespondFormOpen, setIsResponseFormOpen] = useState(false);
  const createdAt = new Date(date);
  const { currentUser } = useContext(AuthContext);

  const { count, items, isLoading, startFrom, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getSubCommentsWithPagination,
      perPage: 5,
      queryData: commentId,
    });

  const onDeleteComment = async () => {
    await deleteComment(commentId);
    reloadParent();
  };

  return (
    <FlexColumn>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: 100 }}
        className={styles.container}
        style={{ ...style, margin }}
      >
        <Avatar
          image={user.attributes.profilePicture?.url()}
          linkToUser={user.attributes.username}
        />
        <div className={styles.dataContainer}>
          <DisplayUsername user={user} />

          <div className={styles.text}>{text.trim()}</div>
          <FlexRow margin="10px 0px 0px 0px ">
            {currentUser && (
              <FlexRow className={styles.actions}>
                {!parentComment && (
                  <span onClick={() => setIsResponseFormOpen((prev) => !prev)}>
                    {isRespondFormOpen ? "Cerrar" : "Responder"}
                  </span>
                )}

                {currentUser?.id === user.id && (
                  <span onClick={onDeleteComment} className={styles.delete}>
                    Borrar
                  </span>
                )}
              </FlexRow>
            )}
            <Moment className={styles.date} fromNow locale="es">
              {createdAt}
            </Moment>
          </FlexRow>
        </div>
      </motion.div>
      <FlexColumn>
        {isRespondFormOpen && (
          <AddCommentForm
            type={RESPONSE_COMMENT}
            parentComment={commentId}
            section={section}
            reloadData={() => {
              setIsResponseFormOpen(false);
              reloadData();
            }}
          />
        )}
        <FlexColumn margin="0px 0px 0px 30px">
          {!isLoading &&
            items.map((item) => (
              <Comment
                reloadData={reloadData}
                parentComment={commentId}
                section={section}
                commentId={item.id}
                key={item.id}
                margin="0px 5px 10px 0px"
                date={item.attributes.createdAt}
                user={item.attributes.createdBy}
                text={item.attributes.text}
              />
            ))}
          {startFrom < count && (
            <span onClick={nextPage} className={styles.loadMore}>
              Ver Mas ({count - startFrom})
            </span>
          )}
        </FlexColumn>
      </FlexColumn>
    </FlexColumn>
  );
};

Comment.defaultProps = {
  margin: "0px",
};

export default Comment;
