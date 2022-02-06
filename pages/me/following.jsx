import FollowingPage from "@pages/ProfilePage/FollowingPage";
import { useContext } from "react";

import { AuthContext } from "src/contexts/AuthContext";
function MyFollowingPage() {
  const { currentUser } = useContext(AuthContext);

  return <>{currentUser && <FollowingPage user={currentUser} />}</>;
}

export default MyFollowingPage;
