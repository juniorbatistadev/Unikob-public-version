import ProfilePage from "@pages/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  const { checkingAuth } = useAuthenticatedPage();

  return <>{!checkingAuth && <ProfilePage userId={currentUser?.id} />}</>;
}

export default Profile;
