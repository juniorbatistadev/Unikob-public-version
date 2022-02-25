import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById } from "src/data/queryUsers";
import FollowingPage from "src/features/ProfilePage/FollowingPage";

function FollowingProfilePage() {
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

  return <>{user && <FollowingPage user={user} />}</>;
}

export default FollowingProfilePage;
