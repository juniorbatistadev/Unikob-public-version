import styles from "./Notification.module.css";
import "moment/locale/es";
import { motion } from "framer-motion";
import DefaultNotification from "./components/DefaultNotification";
import DisplayNotification from "./components/DisplayNotification";
import FollowNotification from "./components/FollowNotification";
import PostCommentNotification from "./components/PostCommentNotification";
import ProfileCommentNotification from "./components/ProfileCommentNotification";
import ResponseCommentNotification from "./components/ResponseCommentNotification";
import {
  POST_COMMENT_NOTIFICATION,
  POST_LIKE_NOTIFICATION,
  PROFILE_COMMENT_NOTIFICATION,
  RESPONSE_COMMENT_NOTIFICATION,
} from "./notificationsType";
import PostLikeNotification from "./components/PostLikeNotification";

const Notification = ({ notification }) => {
  const renderNotification = (notification) => {
    let text;

    switch (notification.attributes.type) {
      case PROFILE_COMMENT_NOTIFICATION:
        return <ProfileCommentNotification notification={notification} />;
      case RESPONSE_COMMENT_NOTIFICATION:
        text = `${notification.attributes.triggeredBy.attributes.username} respondio tu comentario: “${notification.attributes.data} ”`;
        return <ResponseCommentNotification notification={notification} />;
      case POST_COMMENT_NOTIFICATION:
        return <PostCommentNotification notification={notification} />;
      case "GIFT":
        text = `${notification.attributes.triggeredBy.attributes.username} te envio un regalo`;
        return (
          <DisplayNotification notification={notification} content={text} />
        );
      case POST_LIKE_NOTIFICATION:
        // text = `${notification.attributes.triggeredBy.attributes.username} le gusto tu post “ ${notification.attributes.data} ”`;
        return <PostLikeNotification notification={notification} c />;
      case "FOLLOW":
        return <FollowNotification notification={notification} />;
      case "QUESTION_ANSWER":
        text = `${notification.attributes.triggeredBy.attributes.username} respondio tu pregunta   `;
        return (
          <DisplayNotification notification={notification} content={text} />
        );
      case "JOB_APPLICATION_RECEIVED":
        text = `${notification.attributes.triggeredBy.attributes.username} aplico para un trabajo que publicaste  `;
        return (
          <DisplayNotification notification={notification} content={text} />
        );

      default:
        return <DefaultNotification notification={notification} />;
    }
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      {renderNotification(notification)}
    </motion.div>
  );
};

Notification.defaultProps = {};

export default Notification;
