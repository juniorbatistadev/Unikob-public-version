import { useEffect, useState } from "react";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import HeaderSchool from "./components/HeaderSchool";
import TabsMenu from "@components/TabsMenu";
import styles from "./index.module.css";
import Text from "@components/common/Text";
import PinIcon from "@assets/icons/pin.svg";
import FlexRow from "@components/common/FlexRow";
import StudentIcon from "@assets/icons/student.svg";
import ChainIcon from "@assets/icons/chain.svg";
import Button from "@components/common/Button";
import { SCHOOL_READ_PATH } from "src/paths";
import TabsContent from "@components/TabsContent";
import ReviewsSection from "./ReviewsSection";
import MemebersSection from "./MembersSection";
import TeachersSection from "./TeachersSection";
import CrushesSection from "./CrushesSection";
import PlusIcon from "@assets/icons/plus.svg";

const SchoolPage = ({ school }) => {
  return (
    <FlexColumn>
      <FlexColumn>
        <FlexColumn className={styles.headerContainer}>
          <HeaderSchool
            text={school.attributes.name}
            image={school.attributes.image}
          />

          <FlexColumn padding="15px">
            <Button className={styles.joinButton}>
              Agregar a tu perfil{" "}
              <PlusIcon width={20} height={20} className={styles.plus} />
            </Button>

            <Text
              text="INTEC, es una institución dominicana de educación superior privada
              de servicio público, sin fines de lucro, fundada en 1972 por un
              grupo de académicos comprometidos con la transformación social del
              país y la promoción continua de la calidad de la vida de sus
              habitantes. Se caracteriza por la innovación y la
              complementariedad de su oferta académica en las áreas de
              Ingenierías, Negocios, Ciencias de la Salud, Ciencias Básicas y
              Ambientales y Ciencias Sociales y Humanidades."
            />
            <ul className={styles.infoList}>
              <li>
                <FlexRow alignItems="center">
                  <StudentIcon className={styles.icon} />
                  <Text
                    text={
                      school.attributes.type === "highSchool"
                        ? "Secundaria"
                        : "Universidad"
                    }
                  />
                </FlexRow>
              </li>
              {school.attributes.website && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={school.attributes.website}
                    style={{ textDecoration: "none" }}
                  >
                    <FlexRow alignItems="center">
                      <ChainIcon className={styles.icon} />
                      <Text
                        text={school.attributes.website.replace(
                          /(http:\/\/|https:\/\/)/i,
                          ""
                        )}
                      />
                    </FlexRow>
                  </a>
                </li>
              )}

              <li>
                <FlexRow alignItems="center">
                  <PinIcon className={styles.icon} />
                  <Text text={school.attributes.country.attributes.name} />
                </FlexRow>
              </li>
            </ul>
          </FlexColumn>

          <TabsMenu
            path={SCHOOL_READ_PATH.replace(":school", school.attributes.slug)}
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
                name: "UniCrush",
                query: { section: "crushes" },
              },
              {
                link: "members",
                name: "Miembros",
                query: { section: "members" },
              },
            ]}
          />
        </FlexColumn>
        <TabsContent
          slug={"section"}
          tabs={{
            default: <p>Feed</p>,
            reviews: <ReviewsSection school={school} />,
            members: <MemebersSection school={school} />,
            teachers: <TeachersSection school={school} />,
            crushes: <CrushesSection school={school} />,
          }}
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default SchoolPage;
