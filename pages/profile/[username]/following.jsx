import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "src/data/queryUsers";
import FollowingPage from "src/features/ProfilePage/FollowingPage";

function FollowingProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState();

  useEffect(() => {
    if (username) {
      getUserByUsername(username).then((user) => {
        setUser(user);
      });
    }
  }, [username]);

  return <>{user && <FollowingPage user={user} />}</>;
}

export default FollowingProfilePage;
