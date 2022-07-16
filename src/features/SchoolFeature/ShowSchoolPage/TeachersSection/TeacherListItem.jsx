import Title from "@components/common/Title";
import styles from "./TeacherListItem.module.css";
import Text from "@components/common/Text";
import FlexColumn from "@components/common/FlexColumn";
import { useEffect, useState } from "react";
import FlexRow from "@components/common/FlexRow";
import Link from "next/link";
import { TEACHER_READ_PATH } from "src/paths";
import { Rater } from "@components/formikFields";
import Parse from "parse";
import Tag from "@components/common/Tag";

const TeacherListItem = ({ name, subjects, id }) => {
  const [subjectsTags, setSubjectsTags] = useState([]);
  const [avg, setAvg] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getTeacherAverageRating", {
        teacherId: id,
      });

      const tags = await subjects.query().find();

      setSubjectsTags(tags);
      setReviews(result[0].total);
      setAvg(result[0].avg);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [id, subjects]);

  return (
    <Link href={TEACHER_READ_PATH.replace(":teacher", id)}>
      <FlexColumn className={styles.container}>
        <Title text={name} fontSize={18} />
        <FlexRow>
          <Rater disable={true} value={avg} size={15} />
          <Text text={`(${reviews})`} />
        </FlexRow>
        <FlexRow margin="10px 0px 0px 0px">
          {subjectsTags.map((subject) => (
            <FlexRow margin="0px 5px 0px 0px">
              <Tag key={subject.id} text={subject.attributes.name} />
            </FlexRow>
          ))}
        </FlexRow>
      </FlexColumn>
    </Link>
  );
};

export default TeacherListItem;
