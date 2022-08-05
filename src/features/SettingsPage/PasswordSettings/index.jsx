import React, { useContext, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Alert from "@components/common/Alert";
import FlexColumn from "@components/common/FlexColumn";
import errorMessages from "src/parseErrorMessages";

function PasswordSettings() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = () => {
    setIsLoading(true);
    Parse.User.requestPasswordReset(currentUser.attributes.email)
      .then(() => {
        Alert.fire({
          icon: "success",
          title: "Visita tu Correo",
          text: "Haz click en link en el correo que te enviamos",
        });
      })
      .catch((error) => {
        Alert.fire({
          icon: "error",
          title: "Uh no!",

          text: `Hubo un error. ${
            error.code ? errorMessages[error.code] : error
          }`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Contraseña" className={styles.title} />
      </FlexRow>

      <FlexColumn margin={"0px 10px"}>
        <Title
          text="Recibir correo para cambiar la contraseña"
          typeStyle="secondary"
        />

        <Button onClick={resetPassword} loading={isLoading}>
          Cambiar Contraseña
        </Button>
      </FlexColumn>
    </motion.div>
  );
}

export default PasswordSettings;
