import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import FeedBox from "../FeedBox";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { useEffect, useState } from "react";
import { TEACHER_READ_PATH } from "src/paths";
import Rater from "@components/formikFields/Rater";

function TeacherReviewFeedItem({ teacherReview }) {
  const [createdBy, setCreatedBy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (!teacherReview) {
        return;
      }
      const createdBy = await teacherReview.attributes.createdBy.fetch();

      setCreatedBy(createdBy);
    };

    getData().finally(() => setIsLoading(false));
  }, [teacherReview]);

  return (
    <>
      {!isLoading && teacherReview && (
        <FeedBox>
          <FlexColumn padding={15}>
            <FlexRow className={styles.title}>
              <FlexRow>
                <Avatar
                  linkToUser={
                    createdBy?.attributes.username ??
                    teacherReview.attributes.createdBy.attributes.username
                  }
                  className={styles.avatar}
                  width="25px"
                  image={
                    createdBy?.attributes.profilePicture?.url() ??
                    teacherReview.attributes.createdBy?.attributes.profilePicture?.url()
                  }
                />
                <DisplayUsername
                  type={"primary"}
                  user={createdBy ?? teacherReview.attributes.createdBy}
                />
                <Text
                  text={" dejo un review al profesor"}
                  margin="0px 0px 0px 5px"
                />
                <A
                  href={TEACHER_READ_PATH.replace(
                    ":teacher",
                    teacherReview.attributes.teacher.id
                  )}
                >
                  <Text
                    text={teacherReview.attributes.teacher.attributes.name}
                    margin="0px 0px 0px 5px"
                    className={styles.link}
                  />
                </A>
              </FlexRow>
            </FlexRow>

            <A
              href={TEACHER_READ_PATH.replace(
                ":teacher",
                teacherReview.attributes.teacher.id
              )}
            >
              <FlexColumn margin={"5px 0px 10px 0px"}>
                <Rater
                  disable={true}
                  value={teacherReview.attributes.rating}
                  size={15}
                />

                <Text
                  text={teacherReview.attributes.description}
                  fontSize={"var(--text-lg)"}
                />
              </FlexColumn>
              <FlexRow alignItems="center">
                <Moment
                  className={styles.date}
                  fromNow
                  locale="es"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {teacherReview.attributes.createdAt}
                </Moment>
              </FlexRow>
            </A>
          </FlexColumn>
        </FeedBox>
      )}
    </>
  );
}

export default TeacherReviewFeedItem;
