import ProfilePage from "src/features/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  const { checkingAuth } = useAuthenticatedPage();

  return (
    <>
      {!checkingAuth && (
        <ProfilePage username={currentUser?.attributes.username} />
      )}
    </>
  );
}

export default Profile;
