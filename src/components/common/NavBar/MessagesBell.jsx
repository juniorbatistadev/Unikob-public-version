import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import styles from "./MessagesBell.module.css";
import MessageIcon from "@assets/icons/message.svg";
import MessageWithCircleIcon from "@assets/icons/message-with-red-circle.svg";
import { MESSAGES_PATH } from "src/paths";
import { getUnreadNumberOfMessages } from "src/data/queryMessages";
import { AuthContext } from "src/contexts/AuthContext";
import Toast from "@components/common/Toast";

function MessagesBell() {
  const { push, asPath } = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [messagesNumber, setMessagesNumber] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const { amount, subscrition } = await getUnreadNumberOfMessages({
        user: currentUser,
      });

      setMessagesNumber(amount);

      // //receive new messages
      subscrition.on("create", (message) => {
        if (message.attributes.createdBy.id !== currentUser.id) {
          if (!asPath.includes("messages")) {
            Toast.fire({
              title: `Mensaje: ${message.attributes.message.slice(1, 60)}`,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Toast.stopTimer);
                toast.addEventListener("mouseleave", Toast.resumeTimer);
                toast.addEventListener("click", () => {
                  push(MESSAGES_PATH);
                });
              },
            });
          }

          setMessagesNumber((prev) => prev + 1);
        }
      });
      // //if messages was read
      subscrition.on("leave", () => setMessagesNumber((prev) => prev - 1));
    };

    getData();
  }, [currentUser, asPath, push]);

  return (
    <div onClick={() => push(MESSAGES_PATH)}>
      {messagesNumber > 0 ? (
        <MessageWithCircleIcon className={styles.message} />
      ) : (
        <MessageIcon className={styles.message} />
      )}
    </div>
  );
}

export default MessagesBell;
