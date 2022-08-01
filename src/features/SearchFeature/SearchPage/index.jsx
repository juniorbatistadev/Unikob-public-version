import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import { ErrorMessage, TextField } from "@components/formikFields";
import { Form, Formik } from "formik";
import styles from "./index.module.css";
import * as Yup from "yup";
import { useRouter } from "next/router";
import PreviewSearch from "../components/PreviewSearch";

import { SEARCH_PATH } from "src/paths";
import SearchByCollection from "../components/SearchByCollection";
import { searchPostsWithPagination } from "src/data/queryPosts";
import { searchJobsWithPagination } from "src/data/queryJobs";
import { searchSchoolWithPagination } from "src/data/querySchools";
import { searchUsersWithPagination } from "src/data/queryUsers";
import EmptyIlustration from "@assets/icons/empty.svg";
import MoonIlustration from "@assets/icons/moon.svg";
import { useState } from "react";

function SearchPage() {
  const { query, push } = useRouter();
  const [resultFound, setResultFound] = useState(false);

  const searchInfo = {
    Post: {
      title: "Buscando Publicaciones",
      getData: searchPostsWithPagination,
    },
    Job: {
      title: "Buscando trabajos",
      getData: searchJobsWithPagination,
    },
    School: {
      title: "Buscando escuelas",
      getData: searchSchoolWithPagination,
    },
    User: {
      title: "Buscando usuarios",
      getData: searchUsersWithPagination,
    },
  };

  const onSearch = ({ search }) => {
    let queryData = { s: search };
    if (searchInfo[query.c]) queryData.c = query.c;

    push({ pathname: SEARCH_PATH, query: queryData });
    setResultFound(false);
  };

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text={searchInfo[query.c]?.title ?? "Buscar "} />
      </FlexRow>

      <Formik
        initialValues={{
          search: query.s ? query.s : "",
        }}
        onSubmit={onSearch}
        validationSchema={Yup.object({
          search: Yup.string()
            .min("1")
            .required("Necesitas especificar la busqueda"),
        })}
      >
        <Form className={styles.form}>
          <FlexRow>
            <FlexColumn>
              <TextField
                name="search"
                width="200px"
                placeholder="Busqueda"
                type="search"
              />
            </FlexColumn>
            <Button type="submit" margin="0px 0px 0px 10px">
              Buscar
            </Button>
          </FlexRow>
        </Form>
      </Formik>
      <FlexColumn margin={"20px 0px 0px 0px"}>
        {query.s && !searchInfo[query.c] && (
          <>
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number usuarios encontrados`}
                singleResultTitle={`Un usuario encontrado`}
                queryString={query.s}
                collectionName={"User"}
                fieldToSearch="username"
                onResultFound={() => setResultFound(true)}
              />
            </FlexColumn>

            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number publicaciones encontradas`}
                singleResultTitle={`Una publicacion encontrada`}
                queryString={query.s}
                collectionName="Post"
                fieldToSearch="title"
                onResultFound={() => setResultFound(true)}
              />
            </FlexColumn>
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number trabajos encontrados`}
                singleResultTitle={`Un trabajo encontrado`}
                queryString={query.s}
                collectionName="Job"
                fieldToSearch="title"
                onResultFound={() => setResultFound(true)}
              />
            </FlexColumn>
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number escuelas encontradas`}
                singleResultTitle={`Una escuela encontrada`}
                queryString={query.s}
                collectionName="School"
                fieldToSearch="name"
                onResultFound={() => setResultFound(true)}
              />
            </FlexColumn>

            {!resultFound && (
              <FlexColumn alignItems={"center"} margin="20px 0px 0px 0px">
                <EmptyIlustration width={200} height={200} />
                <Title
                  text="No pudimos encontrar nada."
                  fontSize="var(--text-base)"
                />
                <Title
                  text="Intenta con otras palabras"
                  fontSize="var(--text-base)"
                />
              </FlexColumn>
            )}
          </>
        )}
        {query.s && searchInfo[query.c] && (
          <SearchByCollection getData={searchInfo[query.c].getData} />
        )}

        {!query.s && (
          <FlexColumn alignItems={"center"} margin="20px 0px 0px 0px">
            <MoonIlustration width={200} height={200} />
          </FlexColumn>
        )}
      </FlexColumn>
    </FlexColumn>
  );
}

export default SearchPage;
