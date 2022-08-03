import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import EditSchoolPage from "@pages/SchoolFeature/EditSchoolPage";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FEED_PATH } from "src/paths";
import withAuth from "src/helpers/withAuth";
import { getSchoolBySlug } from "src/data/querySchools";
import { getUserRoles } from "src/data/queryRoles";

function EditSchool() {
  const [school, setSchool] = useState();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getData = async () => {
      try {
        const schoolObject = await getSchoolBySlug(slug);

        await setSchool(schoolObject);

        const userRoles = await getUserRoles(currentUser).then((roles) => {
          return roles.map((role) => role.get("name"));
        });

        if (!userRoles.some((role) => ["admin", "moderator"].includes(role))) {
          throw "No puedes editar esta escuela.";
        }

        setIsLoading(false);
      } catch (err) {
        router.push(FEED_PATH);
      }
    };

    if (slug) {
      getData();
    }
  }, [slug, currentUser, router]);

  return isLoading ? <Spinner /> : <EditSchoolPage school={school} />;
}

export default withAuth(EditSchool);
