import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import { SelectSubject, SelectCountry } from "@components/formikFields";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import JobFeedItem from "@pages/FeedPage/components/JobFeedItem";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getJobsWithPagination } from "src/data/queryJobs";
import { JOB_CREATE_PATH } from "src/paths";
import EmptyIlustration from "@assets/icons/empty.svg";

function JobPage() {
  const [subject, setSubject] = useState("");
  const [country, setCountry] = useState("");
  const { push } = useRouter();

  const { startFrom, isLoading, items, count, nextPage, reloadData } =
    useInfiniteScrolling({
      query: getJobsWithPagination,
      queryData: country,
      perPage: 10,
      user: subject,
    });

  console.log("rendered 2");
  return (
    <FlexColumn margin="10px">
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Trabajos" />
        <Button
          margin={"0px 10px 0px auto"}
          onClick={() => push(JOB_CREATE_PATH)}
        >
          Publicar un Trabajo
        </Button>
      </FlexRow>

      <Formik initialValues={{ country: "", subject: "" }}>
        <Form>
          <FlexRow alignItems="center" margin="10px 0px">
            <Text text={"Filtrar:"} />
            <FlexColumn margin={"0px 0px 0px 10px"}>
              <SelectCountry
                onChange={(value) => {
                  if (value.length > 0) setCountry(value[0]?.id);
                }}
                name="country"
                placeholder="Todos los Paises"
                firstOption={{ name: "Todos los paises", id: "" }}
              />
            </FlexColumn>
            <FlexColumn margin={"0px 0px 0px 10px"}>
              <SelectSubject
                onChange={(value) => {
                  if (value.length > 0) setSubject(value[0]?.id);
                }}
                name="subject"
                placeholder="Todas las areas"
                firstOption={{ name: "Todos las areas", id: "" }}
              />
            </FlexColumn>
          </FlexRow>
        </Form>
      </Formik>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          loader={"Cargando"}
          hasMore={startFrom < count}
          next={nextPage}
        >
          {items.map((item) => (
            <FlexColumn margin={"0px 0px 10px 0px"}>
              <JobFeedItem job={item} />
            </FlexColumn>
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="40px auto">
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default JobPage;
