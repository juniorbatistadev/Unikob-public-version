import styles from "./Notification.module.css";
import "moment/locale/es";
import { motion } from "framer-motion";
import DefaultNotification from "./components/DefaultNotification";
import FollowNotification from "./components/FollowNotification";
import PostCommentNotification from "./components/PostCommentNotification";
import ProfileCommentNotification from "./components/ProfileCommentNotification";
import ResponseCommentNotification from "./components/ResponseCommentNotification";
import {
  FOLLOW_NOTIFICATION,
  GIFT_NOTIFICATION,
  POST_COMMENT_NOTIFICATION,
  POST_LIKE_NOTIFICATION,
  PROFILE_COMMENT_NOTIFICATION,
  RESPONSE_COMMENT_NOTIFICATION,
  JOB_APPLICATION_RECEIVED_NOTIFICATION,
  CRUSH_RECEIVED_NOTIFICATION,
} from "../../notificationsTypes";
import PostLikeNotification from "./components/PostLikeNotification";
import GiftNotification from "./components/GiftNotification";
import JobApplicationReceivedNotification from "./components/JobApplicationReceivedNotification";
import CrushReceivedNotification from "./components/CrushReceivedNotification";

const Notification = ({ notification }) => {
  const renderNotification = (notification) => {
    let text;

    switch (notification.attributes.type) {
      case PROFILE_COMMENT_NOTIFICATION:
        return <ProfileCommentNotification notification={notification} />;
      case RESPONSE_COMMENT_NOTIFICATION:
        return <ResponseCommentNotification notification={notification} />;
      case POST_COMMENT_NOTIFICATION:
        return <PostCommentNotification notification={notification} />;
      case GIFT_NOTIFICATION:
        return <GiftNotification notification={notification} />;
      case POST_LIKE_NOTIFICATION:
        return <PostLikeNotification notification={notification} c />;
      case FOLLOW_NOTIFICATION:
        return <FollowNotification notification={notification} />;
      case JOB_APPLICATION_RECEIVED_NOTIFICATION:
        return (
          <JobApplicationReceivedNotification notification={notification} />
        );
      case CRUSH_RECEIVED_NOTIFICATION:
        return <CrushReceivedNotification notification={notification} />;

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
