import { useState } from "react";
import DotsIcon from "@assets/icons/dot.svg";
import styles from "./MenuProfile.module.css";
import PopupMenu from "@components/PopupMenu";
import GiftSVG from "@assets/icons/gift.svg";
import HeartSVG from "@assets/icons/heart.svg";
// import swal from "@sweetalert/with-react";
import SendGiftForm from "./SendGiftForm";
import Alert from "@components/common/Alert";
import DeclareCrushForm from "./SendCrushForm";
import ReportUserForm from "./ReportUserForm";
// import DeclareCrushForm from "../../../components/DeclareCrushForm";

const MenuProfile = ({ user }) => {
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
      html: <ReportUserForm />,
      showConfirmButton: false,
    });
  };

  return (
    <PopupMenu
      options={[
        { label: "Enviar Regalo", onClick: sendGift },
        { label: "Declarar Crush", onClick: declareCrush },
        { label: "Reportar ", onClick: reportUser },
      ]}
    >
      <DotsIcon width="20px" height="20px" />
    </PopupMenu>
  );
};

export default MenuProfile;
