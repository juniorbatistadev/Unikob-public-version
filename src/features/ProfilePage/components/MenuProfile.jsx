import React, { useEffect, useState } from "react";
import DotsIcon from "@assets/icons/dot.svg";
import styles from "./MenuProfile.module.css";
import PopupMenu from "@components/PopupMenu";
import GiftSVG from "@assets/icons/gift.svg";
import HeartSVG from "@assets/icons/heart.svg";
// import swal from "@sweetalert/with-react";
// import SendGiftForm from "../GiftSection/SendGiftForm";
// import DeclareCrushForm from "../../../components/DeclareCrushForm";

const MenuProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const sendGift = () => {
    setIsOpen(false);
    // swal({
    //   buttons: false,
    //   content: <SendGiftForm user={user} />,
    // });
  };

  const declareCrush = () => {
    setIsOpen(false);
    // swal({
    //   buttons: false,
    //   content: <DeclareCrushForm toUser={user} />,
    // });
  };

  return (
    <PopupMenu
      options={[
        { label: "Enviar Regalo", icon: <GiftSVG /> },
        { label: "Declarar Crush", icon: <HeartSVG /> },
      ]}
    >
      <DotsIcon width="20px" height="20px" />
    </PopupMenu>
  );
};

export default MenuProfile;