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
import Title from "@components/common/Title";
import Tag from "@components/common/Tag";

function NewTeacherFeedItem({ teacher, displayComments }) {
  const [createdBy, setCreatedBy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjectsTags, setSubjectsTags] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!teacher) {
        return;
      }
      const createdBy = await teacher.attributes.createdBy.fetch();
      const subjects = await teacher.attributes.subjects.query().find();

      setSubjectsTags(subjects);
      setCreatedBy(createdBy);
    };

    getData().finally(() => setIsLoading(false));
  }, [teacher]);

  return (
    <>
      {!isLoading && teacher && (
        <FeedBox color={"var(--color-indigo-400)"}>
          <FlexColumn padding={15}>
            <FlexRow className={styles.title}>
              <FlexRow>
                <Avatar
                  linkToUser={
                    createdBy?.attributes.username ??
                    teacher.attributes.createdBy.attributes.username
                  }
                  className={styles.avatar}
                  width="25px"
                  image={
                    createdBy?.attributes.profilePicture?.url() ??
                    teacher.attributes.createdBy?.attributes.profilePicture?.url()
                  }
                />
                <DisplayUsername
                  user={createdBy ?? teacher.attributes.createdBy}
                />
                <Text
                  text={" agrego un nuevo profesor"}
                  margin="0px 0px 0px 5px"
                />
              </FlexRow>
            </FlexRow>

            <A href={TEACHER_READ_PATH.replace(":teacher", teacher.id)}>
              <FlexColumn margin={"5px 0px 10px 0px"}>
                <Title text={teacher.attributes.name} fontSize={18} />
                <FlexRow>
                  {subjectsTags.map((subject) => (
                    <FlexRow margin="0px 5px 0px 0px">
                      <Tag key={subject.id} text={subject.attributes.name} />
                    </FlexRow>
                  ))}
                </FlexRow>
              </FlexColumn>
              <FlexRow alignItems="center">
                <Moment
                  className={styles.date}
                  fromNow
                  locale="es"
                  style={{ fontSize: "14px" }}
                >
                  {teacher.attributes.createdAt}
                </Moment>
              </FlexRow>
            </A>
          </FlexColumn>
        </FeedBox>
      )}
    </>
  );
}

export default NewTeacherFeedItem;