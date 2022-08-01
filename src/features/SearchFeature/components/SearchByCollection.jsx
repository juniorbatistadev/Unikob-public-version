import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import { ErrorMessage, TextField } from "@components/formikFields";
import { Form, Formik } from "formik";
// import styles from "./index.module.css";
import * as Yup from "yup";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import { searchSchoolWithPagination } from "src/data/querySchools";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import SchoolResultItem from "../components/SchoolResultItem";
import { AuthContext } from "@context/AuthContext";
import Text from "@components/common/Text";
import { useRouter } from "next/router";
import { SCHOOL_CREATE_PATH } from "src/paths";
import EmptyIlustration from "@assets/icons/empty.svg";
import MoonIlustration from "@assets/icons/moon.svg";
import SearchResult from "./SearchResult";
import LoginToAccess from "@components/LoginToAccess";
import Spinner from "@components/common/Spinner";

function SearchByCollection({ getData }) {
  const { currentUser } = useContext(AuthContext);
  const { query, push } = useRouter();

  const { items, startFrom, count, nextPage, isLoading } = useInfiniteScrolling(
    {
      query: getData,
      queryData: query.s,
      perPage: 10,
    }
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <InfiniteScroll
            dataLength={items.length}
            loader={"Cargando"}
            hasMore={startFrom < count}
            next={nextPage}
          >
            {items.map((item) => (
              <FlexColumn margin="0px 10px 15px 10px">
                <SearchResult data={item} type={query.c} />
              </FlexColumn>
            ))}
          </InfiniteScroll>

          {count === 0 && query.s && (
            <FlexColumn alignItems={"center"}>
              <EmptyIlustration width="200px" height="200px" />
              <Title
                text="No pudimos encontrar nada."
                fontSize="var(--text-base)"
              />
              <Title
                text="Intenta con otras palabras"
                fontSize="var(--text-base)"
              />
              {query.c === "School" && (
                <FlexColumn margin={"10px 0px 0px 0px"}>
                  {currentUser ? (
                    <Button onClick={() => push(SCHOOL_CREATE_PATH)}>
                      Agregar Escuela
                    </Button>
                  ) : (
                    <LoginToAccess text="Inicia sesion para agregar tu escuela" />
                  )}
                </FlexColumn>
              )}
            </FlexColumn>
          )}
          {query.c === "School" && count !== 0 && startFrom + 10 > count && (
            <FlexColumn margin={"20px 0px 0px 0px"} alignItems="center">
              <Text text="¿No encontraste tu escuela? ¡Agregala!" />
              {currentUser ? (
                <Button
                  onClick={() => push(SCHOOL_CREATE_PATH)}
                  margin={"10px 0px 10px 0px"}
                >
                  Agregar Escuela
                </Button>
              ) : (
                <LoginToAccess text="Inicia sesion para agregar tu escuela" />
              )}
            </FlexColumn>
          )}
        </>
      )}
    </>
  );
}

export default SearchByCollection;
