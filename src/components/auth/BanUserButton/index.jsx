import { getUserRoles } from "src/data/queryRoles";
import { saveBan, isUserBanned } from "src/data/queryBans";
import { useContext, useEffect, useState } from "react";
import Alert from "@components/common/Alert";
import { AuthContext } from "@context/AuthContext";
import Button from "@components/common/Button";

function BanUserButton({ user }) {
  const [userRoles, setUserRoles] = useState([]);
  const [isBanned, setIsBanned] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getUserRoles(currentUser).then((roles) => {
      const rolesNames = roles.map((role) => role.get("name"));
      setUserRoles(rolesNames);

      if (canUserBan(rolesNames)) {
        isUserBanned(user).then((isBanned) => setIsBanned(isBanned));
      }
    });
  }, [currentUser, user]);

  const canUserBan = (roles) => {
    return roles.some((role) => ["admin"].includes(role));
  };

  const handleBan = async () => {
    if (isBanned) return;

    await saveBan(user);
    Alert.fire({
      title: "Usuario baneado",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {canUserBan(userRoles) && (
        <Button typeStyle="secondary" padding="5px 15px" onClick={handleBan}>
          {isBanned ? "Usario Baneado" : "Bannear"}
        </Button>
      )}
    </>
  );
}

export default BanUserButton;
