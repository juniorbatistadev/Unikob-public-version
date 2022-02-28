import ProfilePage from "src/features/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import withAuth from "@context/withAuth";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return <ProfilePage username={currentUser?.attributes.username} />;
}

export default withAuth(Profile);
