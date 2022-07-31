import React from "react";
import styles from "./Gift.module.css";
import Avatar from "../../../components/common/Avatar";
import { motion } from "framer-motion";
import Text from "@components/common/Text";
import DisplayUsername from "@components/common/DisplayUsername";

const Gift = ({ image, fromUser, message, name }) => {
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      <img src={image} alt="Gift" className={styles.image} />
      <Text text={name} fontSize="14px" />

      <Avatar
        image={fromUser.attributes.profilePicture?.url()}
        className={styles.avatar}
        linkToUser={fromUser.attributes.username}
      />
      <DisplayUsername user={fromUser} />
      {message && (
        <>
          <span className={styles.arrow} />
          <span className={styles.message}>{message}</span>
        </>
      )}
    </motion.div>
  );
};

export default Gift;
