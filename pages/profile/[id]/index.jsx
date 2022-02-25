import ProfilePage from "src/features/ProfilePage";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && <ProfilePage userId={id} />}</>;
}

export default Profile;
