import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Alert from "@components/common/Alert";
import { getSchoolsByMember } from "src/data/querySchools";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import AddSchoolToProfileButton from "@pages/SchoolFeature/components/AddSchoolToProfileButton";

function PasswordSettings() {
  const { currentUser } = useContext(AuthContext);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getSchoolsByMember(currentUser);

      setSchools(result);
    };

    getData();
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Escuelas" className={styles.title} />
      </FlexRow>
      <FlexColumn>
        {schools.map((school) => (
          <FlexRow key={school.id} className={styles.schoolRow}>
            <Text text={school.attributes.name} />
            <AddSchoolToProfileButton school={school} />
          </FlexRow>
        ))}
      </FlexColumn>
    </motion.div>
  );
}

export default PasswordSettings;
