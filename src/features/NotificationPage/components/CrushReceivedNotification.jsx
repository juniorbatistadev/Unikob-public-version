import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { CRUSH_READ_PATH } from "src/paths";

const CrushReceivedNotification = ({ notification }) => {
  // console.log("asd");
  return (
    <>
      {/* {notification.attributes.crush && ( */}
      <FlexRow alignItems="center" className={styles.notification}>
        {notification.attributes.triggeredBy && (
          <Avatar
            image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
            linkToUser={notification.attributes.triggeredBy.username}
          />
        )}

        <FlexColumn className={styles.content}>
          <FlexRow>
            {notification.attributes.triggeredBy ? (
              <>
                <DisplayUsername
                  className={styles.username}
                  user={notification.attributes.triggeredBy}
                />
                <Text text="tiene un " />
                <A
                  href={
                    notification.attributes.crush?.id
                      ? CRUSH_READ_PATH.replace(
                          ":crush",
                          notification.attributes.crush.id
                        )
                      : null
                  }
                >
                  <Text
                    className={styles.link}
                    text="crush"
                    margin={"0px 5px"}
                  />
                </A>
                <Text text="contigo" />
              </>
            ) : (
              <>
                <Text text="Recibiste un" />
                <A
                  href={
                    notification.attributes.crush?.id
                      ? CRUSH_READ_PATH.replace(
                          ":crush",
                          notification.attributes.crush.id
                        )
                      : null
                  }
                >
                  <Text
                    className={styles.link}
                    text="crush"
                    margin={"0px 5px"}
                  />
                </A>
                <Text text="secreto" />
              </>
            )}
            {notification.attributes.crush && (
              <Text
                text={`"${notification.attributes.crush?.attributes.text}"`}
                margin={"0px 0px 0px 5px"}
              />
            )}
          </FlexRow>
          <Moment className={styles.date} fromNow locale="es">
            {notification.attributes.createdAt}
          </Moment>
        </FlexColumn>
      </FlexRow>
      {/* )} */}
    </>
  );
};

export default CrushReceivedNotification;
