import Avatar from "@components/common/Avatar";
import Button from "@components/common/Button";
import DisplayUsername from "@components/common/DisplayUsername";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import RenderHTML from "@components/RenderHTML";
import MessageButton from "@pages/ProfilePage/components/MessageButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUserSettingByUser } from "src/data/queryUserSettings";
import styles from "./ApplicationItem.module.css";

function ApplicationItem({ application }) {
  const [data, setData] = useState();
  const [isCvOpen, setIsCvOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserSettingByUser(application.attributes.createdBy);

      setData(data);
    };

    getData();
  }, []);

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      <FlexRow>
        <Avatar
          linkToUser={application.attributes.createdBy.attributes.username}
          image={application.attributes.createdBy.attributes.profilePicture?.url()}
        />
        <FlexColumn className={styles.content}>
          <DisplayUsername
            username={application.attributes.createdBy.attributes.username}
            link={application.attributes.createdBy.attributes.username}
            type={"primary"}
          />
          <Text text={application.attributes.message} />
          <FlexRow className={styles.buttons}>
            <Button
              onClick={() => setIsCvOpen((prev) => !prev)}
              typeStyle={isCvOpen ? "secondary" : "primary"}
            >
              {isCvOpen ? "Cerrar Curriculum" : "Ver Curriculum"}
            </Button>
            <MessageButton
              padding={"10px"}
              text={"Enviar Mensaje"}
              toUser={application.attributes.createdBy}
            ></MessageButton>
          </FlexRow>
          {isCvOpen && data && (
            <motion.div animate={{ y: 0 }} initial={{ y: 100 }}>
              <RenderHTML json={data.attributes.curriculum} />
            </motion.div>
          )}
        </FlexColumn>
      </FlexRow>
    </motion.div>
  );
}

export default ApplicationItem;
