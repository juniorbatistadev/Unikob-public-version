import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";
import { JOB_READ_PATH } from "src/paths";
import A from "@components/common/A";
import { useEffect, useState } from "react";

const JobApplicationReceivedNotification = ({ notification }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const job =
        await notification.attributes.jobApplication.attributes.job.fetch();
      setJob(job);
    };
    fetchJob();
  });

  return (
    <>
      {job && (
        <FlexRow alignItems="center" className={styles.notification}>
          <Avatar
            image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
            linkToUser={notification.attributes.triggeredBy.username}
          />
          <FlexColumn className={styles.content}>
            <FlexRow>
              <DisplayUsername
                type={"primary"}
                className={styles.username}
                username={
                  notification.attributes.triggeredBy.attributes.username
                }
              />

              <Text text="aplico para un " />

              <A href={JOB_READ_PATH.replace(":job", job.attributes.slug)}>
                <Text
                  className={styles.link}
                  text="trabajo"
                  margin={"0px 5px"}
                />
              </A>
              <Text text=" que publicaste" />
            </FlexRow>
            <Moment className={styles.date} fromNow locale="es">
              {notification.attributes.createdAt}
            </Moment>
          </FlexColumn>
        </FlexRow>
      )}
    </>
  );
};

export default JobApplicationReceivedNotification;
