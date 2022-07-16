import FlexColumn from "@components/common/FlexColumn";
import { useEffect, useState } from "react";
import { getSchoolsByMember } from "src/data/querySchools";
import StudentIcon from "@assets/icons/student.svg";
import ItemWithIcon from "./ItemWithIcon";
import Text from "@components/common/Text";
import Link from "next/link";
import { SCHOOL_READ_PATH } from "src/paths";

function DisplaySchoolList({ user, ...props }) {
  const [schools, setSchools] = useState([]);
  const [schoolsOverLimit, setSchoolsOverLimit] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const limit = 5;
      const result = await getSchoolsByMember(user);

      setSchools(result.slice(0, limit));

      if (result.length > limit) setSchoolsOverLimit(result.length - limit);

      console.log(result);
    };

    getData();
  }, []);

  return (
    <FlexColumn {...props}>
      {schools.map((school) => (
        <Link
          href={SCHOOL_READ_PATH.replace(":school", school.attributes.slug)}
        >
          <ItemWithIcon
            //   className={styles.pointer}
            // onClick={() =>
            //   navigate("/app/school/" + user.attributes.school.id + "/")
            // }
            IconSVG={StudentIcon}
            text={school.attributes.name}
          />
        </Link>
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
