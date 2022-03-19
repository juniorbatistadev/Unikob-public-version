import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./ConversationPreview.module.css";
import { getLastUnreadMessage } from "src/data/queryMessages";
import FlexColumn from "@components/common/FlexColumn";
import { useRouter } from "next/router";
import { CONVERSATION_PATH } from "src/paths";
// import DotsIcon from "@assets/icons/dot.svg";
// import TrashIcon from "@assets/icons/trash.svg";
// import PopupMenu from "@components/PopupMenu";

const ConversationPreview = ({ conversation }) => {
  const { currentUser } = useContext(AuthContext);
  const [fromUser, setFromUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messagesAmount, setMessagesAmount] = useState(0);
  const { push } = useRouter();

  //getUser
  useEffect(() => {
    const getUser = async () => {
      const fromUser = conversation.attributes.members.filter(
        (member) => member.id !== currentUser.id
      );

      const result = await fromUser[0].fetch();

      setFromUser(result);
      setIsLoading(false);
    };
    getUser();
  }, [conversation.attributes.members, currentUser.id]);

  //get messages amount
  useEffect(() => {
    const getData = async () => {
      const result = await getLastUnreadMessage(conversation, currentUser);

      setMessagesAmount(result);
    };

    getData();
  }, [conversation, currentUser]);

  return (
    <FlexRow
      className={styles.container}
      alignItems="center"
      onClick={() =>
        push(CONVERSATION_PATH.replace(":conversation", conversation.id))
      }
    >
      {!isLoading && (
        <>
          <Avatar image={fromUser.attributes.profilePicture?.url()} />
          <FlexColumn margin="0px 0px 0px 5px">
            <Text
              className={styles.username}
              text={fromUser.attributes.username}
              style={{
                fontWeight: messagesAmount > 0 ? "bold" : 600,
              }}
            />
            <Text
              text={conversation.attributes.lastMessage
                .slice(0, 30)
                .concat(
                  conversation.attributes.lastMessage.length > 30 ? "..." : ""
                )}
              style={{
                fontSize: 12,
                fontWeight: messagesAmount > 0 ? "bold" : 0,
              }}
            />
          </FlexColumn>
          <FlexRow className={styles.icons}>
            {messagesAmount > 0 && (
              <p className={styles.circle}>{messagesAmount}</p>
            )}
            {/* <PopupMenu
              options={[
                {
                  label: "Borrar",
                  icon: <TrashIcon />,
                  onClick: handleDelete,
                },
              ]}
            >
              <DotsIcon width={25} height={25} />
            </PopupMenu> */}
          </FlexRow>
        </>
      )}
    </FlexRow>
  );
};

export default ConversationPreview;