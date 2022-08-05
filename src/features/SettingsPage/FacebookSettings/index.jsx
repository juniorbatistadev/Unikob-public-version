import { useContext, useState, useEffect } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import initFacebook from "src/helpers/initFacebook";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Alert from "@components/common/Alert";
import FlexColumn from "@components/common/FlexColumn";
import errorMessages from "src/parseErrorMessages";

function FacebookSettings() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [isUserLinked, setIsUserLink] = useState(
    Parse.FacebookUtils.isLinked(currentUser)
  );

  useEffect(() => {
    initFacebook();
  }, []);

  const unlinkUser = () => {
    setIsLoading(true);
    Parse.FacebookUtils.unlink(currentUser)
      .then(() => {
        Alert.fire({
          icon: "success",
          text: "Tu cuenta ha sido disvinculada de Facebook",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) =>
        Alert.fire({
          icon: "error",
          title: "Uh no",
          text: `Hubo un error. ${
            error.code ? errorMessages[error.code] : error
          }`,
        })
      )
      .finally(() => {
        setIsLoading(false);
        setIsUserLink(Parse.FacebookUtils.isLinked(currentUser));
      });
  };

  const linkUser = () => {
    setIsLoading(true);
    Parse.FacebookUtils.link(currentUser, "user_gender,email")
      .then(() => {
        Alert.fire({
          icon: "success",
          text: "Tu cuenta ha sido vinculada con Facebook",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) =>
        Alert.fire({
          icon: "error",
          title: "Uh no",

          text: `Hubo un error. ${
            error.code ? errorMessages[error.code] : error
          }`,
        })
      )
      .finally(() => {
        setIsLoading(false);
        setIsUserLink(Parse.FacebookUtils.isLinked(currentUser));
      });
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Facebook Login" className={styles.title} />
      </FlexRow>

      <FlexColumn margin={"0px 10px"}>
        <Title
          text={
            isUserLinked
              ? "Puedes desvincular tu cuenta de Facebook"
              : "Puedes vincular tu cuenta para iniciar sesion con Facebook"
          }
          typeStyle="secondary"
        />
        <Button
          loading={isLoading}
          onClick={isUserLinked ? unlinkUser : linkUser}
          typeStyle={isUserLinked ? "secondary" : "primary"}
        >
          {isUserLinked ? "Desvincular de Facebook" : "Vincular con Facebook"}
        </Button>
      </FlexColumn>
    </motion.div>
  );
}

export default FacebookSettings;
