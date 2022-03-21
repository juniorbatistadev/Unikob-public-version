import Spinner from "@components/common/Spinner";
import ShowSchoolPage from "@pages/SchoolFeature/ShowSchoolPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSchoolBySlug } from "src/data/querySchools";

function ShowSchool() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [school, setSchool] = useState();

  useEffect(() => {
    const getSchool = async () => {
      if (slug) {
        const school = await getSchoolBySlug(slug);

        setSchool(school);
      }
    };

    getSchool().finally(() => setIsLoading(false));
  }, [slug]);

  return <>{!school ? <Spinner /> : <ShowSchoolPage school={school} />}</>;
}

export default ShowSchool;
