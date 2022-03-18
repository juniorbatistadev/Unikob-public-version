import { useContext } from "react";
import styles from "./Message.module.css";
import { AuthContext } from "src/contexts/AuthContext";
import * as moment from "moment";
import "moment/locale/es";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import FlexRow from "@components/common/FlexRow";
import DisplayUsername from "@components/common/DisplayUsername";

const Message = ({ message, withUsername }) => {
  const { currentUser } = useContext(AuthContext);

  const classnamesContainer = [
    styles.container,
    message.attributes.createdBy.id === currentUser.id
      ? styles.right
      : styles.left,
  ].join(" ");

  const classnamesBox = [
    styles.box,
    message.attributes.createdBy.id === currentUser.id
      ? styles.blue
      : styles.white,
  ].join(" ");

  return (
    <FlexColumn className={classnamesContainer}>
      <FlexRow>
        {message.attributes.createdBy.id !== currentUser.id && (
          <Avatar
            linkToUser={message.attributes.createdBy.attributes.username}
            width="36px"
            height="36px"
            margin="0px 5px 0px 0px"
            image={message.attributes.createdBy.attributes.profilePicture?.url()}
          />
        )}
        <div className={classnamesBox}>
          <p>{message.attributes.message}</p>
        </div>
      </FlexRow>
      {withUsername && message.attributes.createdBy.id !== currentUser.id && (
        <DisplayUsername
          username={message.attributes.createdBy.attributes.username}
        />
      )}
      <Text
        fontSize="12px"
        text={moment(message.attributes.createdAt).fromNow()}
      />
    </FlexColumn>
  );
};

export default Message;
