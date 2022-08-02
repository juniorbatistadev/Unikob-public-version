import { useState, useContext } from "react";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
import Button from "@components/common/Button";
import CreateTeacherForm from "./CreateTeacherForm";
import { getSchoolTeachersWithPagination } from "src/data/queryTeachers";
import useInfiniteScrolling from "src/hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import TeacherListItem from "./TeacherListItem";
import { Formik, Form } from "formik";
import { SelectSubject } from "@components/formikFields";
import Text from "@components/common/Text";
import FlexRow from "@components/common/FlexRow";
import EmptyIlustration from "@assets/icons/empty.svg";
import { AuthContext } from "src/contexts/AuthContext";
import styles from "./index.module.css";
import Alert from "@components/common/Alert";
import LoginToAccess from "@components/LoginToAccess";

const TeachersSection = ({ school }) => {
  const [subject, setSubject] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { items, count, startFrom, nextPage, isLoading, reloadData } =
    useInfiniteScrolling({
      query: getSchoolTeachersWithPagination,
      queryData: school,
      user: subject,
      perPage: 10,
    });

  return (
    <FlexColumn>
      <FlexRow margin={"0px 10px"}>
        <Title text="Profesores" />
        <FlexRow className={styles.addTeacherButton}>
          {currentUser ? (
            <Button
              onClick={() =>
                Alert.fire({
                  html: (
                    <CreateTeacherForm
                      school={school}
                      reloadData={reloadData}
                    />
                  ),
                  showConfirmButton: false,
                })
              }
            >
              Agregar Profesor
            </Button>
          ) : (
            <LoginToAccess text="Inicia sesion para agregar profesores" />
          )}
        </FlexRow>
      </FlexRow>

      <Formik initialValues={{ subject: "" }}>
        <Form>
          <FlexRow alignItems="center" margin="10px ">
            <Text text="Mostrar por asignatura:" />
            <FlexRow margin={"0px 10px 0px auto"}>
              <SelectSubject
                className={styles.selectSubject}
                onChange={(value) => {
                  if (value.length > 0) setSubject(value[0].id);
                }}
                name="subject"
                placeholder="Mostrar todas"
                firstOption={{ name: "Mostrar todas", id: "" }}
              />
            </FlexRow>
          </FlexRow>
        </Form>
      </Formik>

      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item, index) => (
          <TeacherListItem
            key={index}
            id={item.id}
            name={item.attributes.name}
            subjects={item.attributes.subjects}
          />
        ))}
      </InfiniteScroll>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto auto auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default TeachersSection;
