// import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./MessagesBell.module.css";
import MessageIcon from "@assets/icons/message.svg";
import { MESSAGES_PATH } from "src/paths";
// import bellImgWithCircle from "@assets/icons/message-with-red-circle.svg";
// import { useNavigate } from "react-router-dom";
// import { getUnreadNumberOfMessages } from "../../../data/queryMessages";
// import { useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";

function MessagesBell() {
  const { push } = useRouter();
  // const { currentUser } = useContext(AuthContext);
  // const [messagesNumber, setMessagesNumber] = useState();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = async () => {
  //     const { amount, subscrition } = await getUnreadNumberOfMessages(
  //       currentUser
  //     );

  //     setMessagesNumber(amount);

  //     //receive new messages
  //     subscrition.on("create", (message) => {
  //       if (message.attributes.createdBy.id !== currentUser.id) {
  //         setMessagesNumber((prev) => prev + 1);
  //       }
  //     });
  //     //if messages was read
  //     subscrition.on("leave", () => setMessagesNumber((prev) => prev - 1));
  //   };

  //   getData();
  // }, [currentUser]);

  return (
    <div onClick={() => push(MESSAGES_PATH)}>
      <MessageIcon className={styles.message} />
      {/* <img
        className={styles.message}
        // src={messagesNumber > 0 ? bellImgWithCircle : bellImg}
        alt="Messages"
      /> */}
    </div>
  );
}

export default MessagesBell;
