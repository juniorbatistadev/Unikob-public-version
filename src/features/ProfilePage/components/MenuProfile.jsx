import { useContext, useEffect, useState } from "react";
import DotsIcon from "@assets/icons/dot.svg";
import styles from "./MenuProfile.module.css";
import PopupMenu from "@components/PopupMenu";
import SendGiftForm from "./SendGiftForm";
import Alert from "@components/common/Alert";
import DeclareCrushForm from "./SendCrushForm";
import ReportUserForm from "./ReportForm";
import BlockUserForm from "./BlockUserForm";
import { isBlocked } from "src/data/queryUserBlocks";
import { AuthContext } from "@context/AuthContext";

const MenuProfile = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [isUserBlocked, setIsUserBlocked] = useState();

  useEffect(() => {
    isBlocked(currentUser, user).then(setIsUserBlocked);
  }, []);

  const sendGift = () => {
    Alert.fire({
      html: <SendGiftForm user={user} />,
      showConfirmButton: false,
    });
  };

  const declareCrush = () => {
    Alert.fire({
      html: <DeclareCrushForm toUser={user} />,
      showConfirmButton: false,
    });
  };

  const reportUser = () => {
    Alert.fire({
      html: <ReportUserForm toUser={user} />,

      showConfirmButton: false,
    });
  };

  const blockUser = () => {
    Alert.fire({
      html: (
        <BlockUserForm
          fromUser={currentUser}
          toUser={user}
          action={isUserBlocked ? "unblock" : "block"}
          setIsUserBlocked={setIsUserBlocked}
        />
      ),
      showConfirmButton: false,
    });
  };

  return (
    <PopupMenu
      options={[
        { label: "Enviar Regalo", onClick: sendGift },
        { label: "Declarar Crush", onClick: declareCrush },
        { label: "Reportar Usuario", onClick: reportUser },
        {
          label: isUserBlocked ? "Desbloquear" : "Bloquear Usuario ",
          onClick: blockUser,
        },
      ]}
    >
      <DotsIcon width="20px" height="20px" />
    </PopupMenu>
  );
};

export default MenuProfile;
