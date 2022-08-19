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
import DotsIcon from "@assets/icons/dot.svg";
import PopupMenu from "@components/PopupMenu";
import Alert from "@components/common/Alert";
import ReportForm from "@pages/ProfilePage/components/ReportForm";

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

  const onReportMessage = ({ toUser }) => {
    Alert.fire({
      html: (
        <ReportForm
          content={`Message: ${message.attributes.message}`}
          toUser={toUser}
        />
      ),
      showConfirmButton: false,
    });
  };

  return (
    <FlexColumn className={classnamesContainer}>
      <FlexRow alignItems={"center"}>
        {message.attributes.createdBy.id !== currentUser.id && (
          <FlexRow margin="0px 5px 0px 0px">
            <Avatar
              linkToUser={message.attributes.createdBy.attributes.username}
              width="36px"
              height="36px"
              image={message.attributes.createdBy.attributes.profilePicture?.url()}
            />
          </FlexRow>
        )}
        <div className={classnamesBox}>
          <p>{message.attributes.message}</p>
        </div>
        {message.attributes.createdBy.id !== currentUser.id && (
          <PopupMenu
            options={[
              {
                label: "Reportar",
                onClick: () =>
                  onReportMessage({ toUser: message.attributes.createdBy }),
              },
            ]}
          >
            <FlexRow margin={"0px 0px 0px 5px"}>
              <DotsIcon width="20px" height="20px" />
            </FlexRow>
          </PopupMenu>
        )}
      </FlexRow>
      {withUsername && message.attributes.createdBy.id !== currentUser.id && (
        <DisplayUsername user={message.attributes.createdBy} />
      )}
      <Text
        fontSize="var(--text-xs)"
        text={moment(message.attributes.createdAt).fromNow()}
      />
    </FlexColumn>
  );
};

export default Message;
