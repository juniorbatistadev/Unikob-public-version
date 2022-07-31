import FlexColumn from "@components/common/FlexColumn";
import HeaderSchool from "./components/HeaderSchool";
import TabsMenu from "@components/TabsMenu";
import styles from "./index.module.css";
import Text from "@components/common/Text";
import PinIcon from "@assets/icons/pin.svg";
import FlexRow from "@components/common/FlexRow";
import StudentIcon from "@assets/icons/student.svg";
import ChainIcon from "@assets/icons/chain.svg";
import { SCHOOLS_PATH, SCHOOL_EDIT_PATH, SCHOOL_READ_PATH } from "src/paths";
import TabsContent from "@components/TabsContent";
import ReviewsSection from "./ReviewsSection";
import MembersSection from "./MembersSection";
import TeachersSection from "./TeachersSection";
import CrushesSection from "./CrushesSection";
import Parse from "parse";
import AddSchoolToProfileButton from "@pages/SchoolFeature/components/AddSchoolToProfileButton";
import FeedSection from "./FeedSection";
import { getUserRoles } from "src/data/queryRoles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import Button from "@components/common/Button";
import Alert from "@components/common/Alert";
import { useRouter } from "next/router";
import { deleteSchool } from "src/data/querySchools";

const SchoolPage = ({ data }) => {
  const [userRoles, setUserRoles] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { replace, push } = useRouter();

  const School = Parse.Object.extend("School");
  const schoolObject = new School();
  schoolObject.id = data.objectId;

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar esta escuela?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await deleteSchool(data.objectId);
      await replace(SCHOOLS_PATH);
    }
  };

  useEffect(() => {
    getUserRoles(currentUser).then((roles) => {
      const rolesNames = roles.map((role) => role.get("name"));
      setUserRoles(rolesNames);
    });
  }, [currentUser]);

  const canUserDelete = () => {
    return userRoles.some((role) => ["admin", "moderator"].includes(role));
  };

  return (
    <FlexColumn className={styles.container}>
      <FlexColumn className={styles.headerContainer}>
        <HeaderSchool text={data.name} schoolId={data.id} />

        <FlexColumn padding="15px">
          <FlexRow gap={10}>
            <AddSchoolToProfileButton school={schoolObject} />

            {canUserDelete() && (
              <>
                <Button typeStyle="secondary" onClick={onDelete}>
                  Borrar
                </Button>
                <Button
                  onClick={() =>
                    push(SCHOOL_EDIT_PATH.replace(":school", data.slug))
                  }
                  typeStyle="secondary"
                >
                  Editar
                </Button>
              </>
            )}
          </FlexRow>

          <Text text={data.description} />
          <ul className={styles.infoList}>
            <li>
              <FlexRow alignItems="center">
                <StudentIcon className={styles.icon} />
                <Text
                  text={
                    data.type === "highSchool" ? "Secundaria" : "Universidad"
                  }
                />
              </FlexRow>
            </li>
            {data.website && (
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.website}
                  style={{ textDecoration: "none" }}
                >
                  <FlexRow alignItems="center">
                    <ChainIcon className={styles.icon} />
                    <Text
                      text={data.website.replace(/(http:\/\/|https:\/\/)/i, "")}
                    />
                  </FlexRow>
                </a>
              </li>
            )}
            {data.country && (
              <li>
                <FlexRow alignItems="center">
                  <PinIcon className={styles.icon} />
                  <Text text={data.country.name} />
                </FlexRow>
              </li>
            )}
          </ul>
        </FlexColumn>
      </FlexColumn>
      <TabsMenu
        path={SCHOOL_READ_PATH.replace(":school", data.slug)}
        slug="section"
        options={[
          { name: "Inicio", query: {} },
          {
            link: "reviews",
            name: "Reviews",
            query: { section: "reviews" },
          },
          {
            link: "teachers",
            name: "Profesores",
            query: { section: "teachers" },
          },
          {
            link: "crushes",
            name: "Crushes",
            query: { section: "crushes" },
          },
          {
            link: "members",
            name: "Miembros",
            query: { section: "members" },
          },
        ]}
      />
      <FlexColumn className={styles.contentContainer}>
        <TabsContent
          slug={"section"}
          tabs={{
            default: <FeedSection school={schoolObject} />,
            reviews: <ReviewsSection school={schoolObject} />,
            members: <MembersSection school={schoolObject} />,
            teachers: <TeachersSection school={schoolObject} />,
            crushes: <CrushesSection school={schoolObject} />,
          }}
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default SchoolPage;
