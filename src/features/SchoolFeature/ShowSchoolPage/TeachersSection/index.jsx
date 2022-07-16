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
      <FlexRow className={styles.titleContainer}>
        <Title text="Profesores" />
        {currentUser ? (
          <Button
            className={styles.addTeacherButton}
            onClick={() =>
              Alert.fire({
                html: (
                  <CreateTeacherForm school={school} reloadData={reloadData} />
                ),
                showConfirmButton: false,
              })
            }
          >
            Agregar Profesor
          </Button>
        ) : (
          <FlexRow>
            <Button onClick={() => navigate("/")}>
              Inicia sesion para agregar profesores
            </Button>
          </FlexRow>
        )}
      </FlexRow>

      <Formik initialValues={{ subject: "" }}>
        <Form>
          <FlexRow alignItems="center" margin="10px 10px">
            <Text text="Mostrar por asignatura:" />
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
        </Form>
      </Formik>

      <InfiniteScroll
        dataLength={items.length}
        loader={"Cargando"}
        hasMore={startFrom < count}
        next={nextPage}
      >
        {items.map((item) => (
          <TeacherListItem
            key={item.id}
            id={item.id}
            name={item.attributes.name}
            subjects={item.attributes.subjects}
          />
        ))}
      </InfiniteScroll>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default TeachersSection;
