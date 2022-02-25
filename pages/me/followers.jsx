import FollowersPage from "src/features/ProfilePage/FollowersPage";
import { useContext } from "react";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

import { AuthContext } from "src/contexts/AuthContext";
function MyFollowersPage() {
  const { currentUser } = useContext(AuthContext);
  useAuthenticatedPage();

  return <>{currentUser && <FollowersPage user={currentUser} />}</>;
}

export default MyFollowersPage;
