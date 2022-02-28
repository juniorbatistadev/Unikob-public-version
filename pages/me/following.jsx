import FollowingPage from "src/features/ProfilePage/FollowingPage";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import withAuth from "src/helpers/withAuth";

function MyFollowingPage() {
  const { currentUser } = useContext(AuthContext);

  return <FollowingPage user={currentUser} />;
}

export default withAuth(MyFollowingPage);
