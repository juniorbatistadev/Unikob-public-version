import FlexColumn from "@components/common/FlexColumn";
import HeaderSchool from "./components/HeaderSchool";
import TabsMenu from "@components/TabsMenu";
import styles from "./index.module.css";
import Text from "@components/common/Text";
import PinIcon from "@assets/icons/pin.svg";
import FlexRow from "@components/common/FlexRow";
import StudentIcon from "@assets/icons/student.svg";
import ChainIcon from "@assets/icons/chain.svg";
import { SCHOOL_READ_PATH } from "src/paths";
import TabsContent from "@components/TabsContent";
import ReviewsSection from "./ReviewsSection";
import MembersSection from "./MembersSection";
import TeachersSection from "./TeachersSection";
import CrushesSection from "./CrushesSection";
import Parse from "parse";
import AddSchoolToProfileButton from "@pages/SchoolFeature/components/AddSchoolToProfileButton";

const SchoolPage = ({ data }) => {
  const School = Parse.Object.extend("School");

  const schoolObject = new School();
  schoolObject.id = data.objectId;

  return (
    <FlexColumn className={styles.container}>
      <FlexColumn className={styles.headerContainer}>
        <HeaderSchool text={data.name} schoolId={data.id} />

        <FlexColumn padding="15px">
          <AddSchoolToProfileButton school={schoolObject} />

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
            default: <p>Feed</p>,
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
