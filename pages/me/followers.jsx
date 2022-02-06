import FollowersPage from "@pages/ProfilePage/FollowersPage";
import { useContext } from "react";

import { AuthContext } from "src/contexts/AuthContext";
function MyFollowersPage() {
  const { currentUser } = useContext(AuthContext);

  return <>{currentUser && <FollowersPage user={currentUser} />}</>;
}

export default MyFollowersPage;
