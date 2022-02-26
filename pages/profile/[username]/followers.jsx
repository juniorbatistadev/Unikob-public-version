import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById } from "src/data/queryUsers";
import FollowersPage from "src/features/ProfilePage/FollowersPage";

function FollowersProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();

  useEffect(() => {
    if (id) {
      getUserById(id).then((user) => {
        setUser(user);
      });
    }
  }, [id]);

  return <>{user && <FollowersPage user={user} />}</>;
}

export default FollowersProfilePage;
