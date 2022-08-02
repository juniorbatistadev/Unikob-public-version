import Alert from "@components/common/Alert";
import Button from "@components/common/Button";
import { AuthContext } from "@context/AuthContext";
import SendGiftForm from "@pages/ProfilePage/components/SendGiftForm";
import React, { useContext } from "react";

function SendGiftButton({ text, toUser, ...props }) {
  const { currentUser } = useContext(AuthContext);
  const sendGift = () => {
    Alert.fire({
      html: <SendGiftForm user={toUser} />,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {currentUser && currentUser?.id !== toUser.id && (
        <Button onClick={sendGift} padding="5px 15px" {...props}>
          {text}
        </Button>
      )}
    </>
  );
}

SendGiftButton.defaultProps = {
  text: "Enviar regalo",
};

export default SendGiftButton;
