import { useState } from "react";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import Alert from "@components/common/Alert";
import errorMessages from "src/parseErrorMessages";
import { deleteBlock, saveUserBlock } from "src/data/queryUserBlocks";

const BlockUserForm = ({ toUser, action, fromUser, setIsUserBlocked }) => {
  const [wasSent, setWasSent] = useState(false);

  const handleBlockUser = async () => {
    try {
      await saveUserBlock(toUser);
      setWasSent(true);
      setIsUserBlocked(true);
    } catch (error) {
      Alert.fire({
        icon: "error",
        text: `Hubo un error. ${error.code && errorMessages[error.code]}`,
      });
    }
  };

  const handleUnblockUser = async () => {
    try {
      await deleteBlock(fromUser, toUser);
      setWasSent(true);
      setIsUserBlocked(false);
    } catch (error) {
      Alert.fire({
        icon: "error",
        text: `Hubo un error. ${error.code && errorMessages[error.code]}`,
      });
    }
  };

  return (
    <FlexColumn alignItems="center">
      <Title
        text={action === "block" ? "Bloquear Usuario" : "Desbloquear Usuario"}
      />
      {wasSent ? (
        <Text text="Usario bloqueado" />
      ) : (
        <FlexColumn>
          {action === "block" ? (
            <FlexColumn margin={"10px 0px 10px 0px"}>
              <Text
                text={
                  "¿Estas seguro que quieres bloquear este usuario? Esto va a :"
                }
              />
              <Text
                text={
                  "- Prevenir a este usuario de comentar en tus publicaciones y perfil."
                }
              />
              <Text text={"- Bloquear notificaciones de este usuario."} />
              <Text text={"- Bloquear mensajes de este usuario."} />
            </FlexColumn>
          ) : (
            <Text
              text={"¿Estas seguro que quieres desbloquear este usuario?"}
              margin={"10px 0px 10px 0px"}
            />
          )}

          <Button
            type="submit"
            onClick={action === "block" ? handleBlockUser : handleUnblockUser}
          >
            {action === "block" ? "Bloquear Usuario" : "Desbloquear Usuario"}
          </Button>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default BlockUserForm;
