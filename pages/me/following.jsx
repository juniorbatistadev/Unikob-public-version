import FollowingPage from "src/features/ProfilePage/FollowingPage";
import { useContext } from "react";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";

import { AuthContext } from "src/contexts/AuthContext";
function MyFollowingPage() {
  const { currentUser } = useContext(AuthContext);
  useAuthenticatedPage();

  return <>{currentUser && <FollowingPage user={currentUser} />}</>;
}

export default MyFollowingPage;
