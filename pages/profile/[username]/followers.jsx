import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "src/data/queryUsers";
import FollowersPage from "src/features/ProfilePage/FollowersPage";

function FollowersProfilePage() {
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

  return <>{user && <FollowersPage user={user} />}</>;
}

export default FollowersProfilePage;
