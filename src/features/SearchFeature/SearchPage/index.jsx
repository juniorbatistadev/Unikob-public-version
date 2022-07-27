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

function SearchPage() {
  const { query, push } = useRouter();

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
  };

  const onSearch = ({ search }) => {
    let searchString = SEARCH_PATH.concat("?s=" + search);

    if (searchInfo[query.c])
      searchString = searchString.concat(`&c=${query.c}`);

    push(searchString);
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
              <TextField name="search" width="200px" placeholder="Busqueda" />
              <ErrorMessage name="search" />
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
              />
            </FlexColumn>

            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number publicaciones encontradas`}
                singleResultTitle={`Una publicacion encontrada`}
                queryString={query.s}
                collectionName="Post"
                fieldToSearch="title"
              />
            </FlexColumn>
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number trabajos encontrados`}
                singleResultTitle={`Un trabajo encontrado`}
                queryString={query.s}
                collectionName="Job"
                fieldToSearch="title"
              />
            </FlexColumn>
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <PreviewSearch
                title={`:number escuelas encontradas`}
                singleResultTitle={`Una escuela encontrada`}
                queryString={query.s}
                collectionName="School"
                fieldToSearch="name"
              />
            </FlexColumn>
          </>
        )}
        {query.s && searchInfo[query.c] && (
          <SearchByCollection getData={searchInfo[query.c].getData} />
        )}
      </FlexColumn>
    </FlexColumn>
  );
}

export default SearchPage;
