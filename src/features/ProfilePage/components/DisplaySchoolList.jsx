import FlexColumn from "@components/common/FlexColumn";
import { useEffect, useState } from "react";
import StudentIcon from "@assets/icons/student.svg";
import ItemWithIcon from "./ItemWithIcon";
import Text from "@components/common/Text";
import Link from "next/link";
import { SCHOOL_READ_PATH } from "src/paths";
import A from "@components/common/A";
import { getSchoolsByMember } from "src/data/querySchoolMembers";

function DisplaySchoolList({ user, ...props }) {
  const [schools, setSchools] = useState([]);
  const [schoolsOverLimit, setSchoolsOverLimit] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const limit = 5;
      const result = await getSchoolsByMember(user);

      setSchools(result.slice(0, limit));

      if (result.length > limit) setSchoolsOverLimit(result.length - limit);
    };

    getData();
  }, []);

  return (
    <FlexColumn {...props}>
      {schools.map((member) => (
        <>
          {member.attributes.school && (
            <A
              href={SCHOOL_READ_PATH.replace(
                ":school",
                member.attributes.school?.attributes.slug
              )}
            >
              <ItemWithIcon
                IconSVG={StudentIcon}
                text={member.attributes.school?.attributes.name}
              />
            </A>
          )}
        </>
      ))}
      {schoolsOverLimit > 0 && (
        <Text
          text={`(${schoolsOverLimit} escuelas mas)`}
          margin="10px auto 0px 20px"
        />
      )}
    </FlexColumn>
  );
}

export default DisplaySchoolList;
