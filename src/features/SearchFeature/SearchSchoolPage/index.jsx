import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import { ErrorMessage, TextField } from "@components/formikFields";
import { Form, Formik } from "formik";
import styles from "./index.module.css";
import * as Yup from "yup";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { searchSchoolWithPagination } from "src/data/querySchools";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import SchoolResultItem from "./components/SchoolResultItem";
import { AuthContext } from "@context/AuthContext";
import Text from "@components/common/Text";
import { useRouter } from "next/router";
import { SCHOOL_CREATE_PATH } from "src/paths";
import EmptyIlustration from "@assets/icons/empty.svg";
import MoonIlustration from "@assets/icons/moon.svg";

function SearchSchoolPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { query, push } = useRouter();

  const { items, startFrom, count, nextPage, isLoading } = useInfiniteScrolling(
    {
      query: searchSchoolWithPagination,
      queryData: searchQuery,
      perPage: 10,
    }
  );

  useEffect(() => {
    setSearchQuery(query.search);
  }, [query]);

  const onSearch = ({ search }) => {
    setSearchQuery(search);
  };

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Buscar Escuela" />
      </FlexRow>

      <Formik
        initialValues={{
          search: query.search ? query.search : "",
        }}
        onSubmit={onSearch}
        validationSchema={Yup.object({
          search: Yup.string()
            .min("1")
            .required("Necesitas especificar el nombre"),
        })}
      >
        <Form className={styles.form}>
          <FlexRow>
            <FlexColumn>
              <TextField
                name="search"
                width="200px"
                placeholder="Busca tu escuela"
              />
              <ErrorMessage name="search" />
            </FlexColumn>
            <Button type="submit" margin="0px 0px 0px 10px">
              Buscar
            </Button>
          </FlexRow>
        </Form>
      </Formik>

      {!isLoading && (
        <>
          <InfiniteScroll
            dataLength={items.length}
            loader={"Cargando"}
            hasMore={startFrom < count}
            next={nextPage}
            className={styles.reviewsContainer}
          >
            {items.map((item) => (
              <FlexColumn margin="15px 0px 0px 0px">
                <SchoolResultItem school={item} />
              </FlexColumn>
            ))}
          </InfiniteScroll>
          {count !== 0 && startFrom + 10 > count && (
            <FlexColumn margin={"20px 0px 0px 0px"}>
              <Text text="¿No encontraste tu escuela? ¡Agregala!" />
              {currentUser ? (
                <Button onClick={() => push(SCHOOL_CREATE_PATH)}>
                  Agregar Escuela
                </Button>
              ) : (
                <Button>Inicia sesion para agregar tu escuela</Button>
              )}
            </FlexColumn>
          )}

          {count === 0 && searchQuery && (
            <FlexColumn alignItems={"center"}>
              <EmptyIlustration width="200px" height="200px" />
              <Title text="No pudimos encontrar nada." fontSize="16px" />
              <Title
                text="Intenta con otras palabras o agrega la escuela."
                fontSize="16px"
              />
              {currentUser ? (
                <Button
                  margin={"10px 0px 0px 0px"}
                  onClick={() => push(SCHOOL_CREATE_PATH)}
                >
                  Agregar Escuela
                </Button>
              ) : (
                <Button>Inicia sesion para agregar tu escuela</Button>
              )}
            </FlexColumn>
          )}
          {!searchQuery && (
            <FlexColumn alignItems={"center"} margin="60px 0px 0px 0px">
              <MoonIlustration width={200} height={200} />
            </FlexColumn>
          )}
        </>
      )}
    </FlexColumn>
  );
}

export default SearchSchoolPage;
