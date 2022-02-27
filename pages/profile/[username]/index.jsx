import ProfilePage from "src/features/ProfilePage";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const { username } = router.query;

  return <>{username && <ProfilePage username={username} />}</>;
}

export default Profile;
