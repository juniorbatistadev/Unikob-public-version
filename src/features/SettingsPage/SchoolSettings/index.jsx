import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import { getSchoolsByMember } from "src/data/querySchools";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import AddSchoolToProfileButton from "@pages/SchoolFeature/components/AddSchoolToProfileButton";
import EmptyIlustration from "@assets/icons/empty.svg";
import Spinner from "@components/common/Spinner";
import { useRouter } from "next/router";
import { SEARCH_PATH, SEARCH_SCHOOL_PATH } from "src/paths";

function PasswordSettings() {
  const { currentUser } = useContext(AuthContext);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const result = await getSchoolsByMember(currentUser);

      setSchools(result);
    };

    getData().finally(() => setIsLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Escuelas" className={styles.title} />
        <Button
          margin={"10px 10px 0px auto"}
          onClick={() =>
            router.push({
              pathname: SEARCH_PATH,
              query: { c: "School" },
            })
          }
        >
          Buscar Escuela
        </Button>
      </FlexRow>
      {isLoading ? (
        <Spinner />
      ) : schools.length > 0 ? (
        <FlexColumn>
          {schools.map((school) => (
            <FlexRow key={school.id} className={styles.schoolRow}>
              <Text text={school.attributes.name} />
              <AddSchoolToProfileButton school={school} />
            </FlexRow>
          ))}
        </FlexColumn>
      ) : (
        <FlexColumn alignItems={"center"}>
          <EmptyIlustration width={200} height={200} />
          <Text text="No tienes escuelas asignadas" />
        </FlexColumn>
      )}
    </motion.div>
  );
}

export default PasswordSettings;
