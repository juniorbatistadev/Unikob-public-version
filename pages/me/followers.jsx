import FollowersPage from "src/features/ProfilePage/FollowersPage";
import { useContext } from "react";

import { AuthContext } from "src/contexts/AuthContext";
import withAuth from "src/helpers/withAuth";

function MyFollowersPage() {
  const { currentUser } = useContext(AuthContext);

  return <FollowersPage user={currentUser} />;
}

export default withAuth(MyFollowersPage);
