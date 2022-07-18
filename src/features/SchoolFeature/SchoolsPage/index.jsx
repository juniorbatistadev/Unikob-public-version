import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import SearchSchoolRedirectForm from "./components/SearchSchoolRedirectForm";
import TabsMenu from "@components/TabsMenu";
import TabsContent from "@components/TabsContent";
import { SCHOOLS_PATH } from "src/paths";
import { Form, Formik } from "formik";
import { SelectCountry } from "@components/formikFields";
import { useState } from "react";
import SchoolsRanking from "./components/SchoolsRanking";
import RecentSchools from "./components/RecentSchools";

function SchoolPage() {
  const [country, setCountry] = useState("");

  return (
    <FlexColumn margin="10px">
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Escuelas" />
      </FlexRow>
      <SearchSchoolRedirectForm />
      <FlexRow margin={"10px 0px"}>
        <TabsMenu
          typeStyle="clear"
          path={SCHOOLS_PATH}
          slug="section"
          options={[
            { name: "Mejores", query: {} },

            {
              link: "recent",
              name: "Recientes",
              query: { section: "recent" },
            },
          ]}
        />

        <Formik initialValues={{ country: "" }}>
          <Form className={styles.selectCountry}>
            <FlexColumn alignItems="center" margin="10px 0px">
              <SelectCountry
                onChange={(value) => {
                  if (value.length > 0) setCountry(value[0].id);
                }}
                name="country"
                placeholder="Todos los Paises"
                firstOption={{ name: "Todos los paises", id: "" }}
              />
            </FlexColumn>
          </Form>
        </Formik>
      </FlexRow>
      <FlexColumn className={styles.contentContainer}>
        <TabsContent
          slug={"section"}
          tabs={{
            default: <SchoolsRanking country={country} />,
            recent: <RecentSchools country={country} />,
          }}
        />
      </FlexColumn>
    </FlexColumn>
  );
}

export default SchoolPage;
