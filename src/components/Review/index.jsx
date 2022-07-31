import Avatar from "@components/common/Avatar";
import styles from "./index.module.css";
import Text from "@components/common/Text";
import Moment from "react-moment";
import "moment/locale/es";
import { motion } from "framer-motion";
import Rater from "@components/formikFields/Rater";
import DisplayUsername from "@components/common/DisplayUsername";

const Review = ({ text, user, date, margin, rating }) => {
  const createdAt = new Date(date);

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
      style={{ margin }}
    >
      <Avatar
        image={user.attributes.profilePicture?.url()}
        linkToUser={user.attributes.username}
      />
      <div className={styles.dataContainer}>
        <DisplayUsername user={user} />
        <Rater disable={true} value={rating} size={15} />
        <Text text={text} />
        <Moment className={styles.date} fromNow locale="es">
          {createdAt}
        </Moment>
      </div>
    </motion.div>
  );
};

Review.defaultProps = {
  margin: "0px",
};

export default Review;
