import ProfilePage from "@pages/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return <ProfilePage userId={currentUser?.id} />;
}

export default Profile;
