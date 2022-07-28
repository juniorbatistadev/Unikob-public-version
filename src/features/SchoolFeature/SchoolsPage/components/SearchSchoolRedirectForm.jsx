import { Formik, Form } from "formik";
import { TextField } from "@components/formikFields";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import { useRouter } from "next/router";
import { SEARCH_PATH } from "src/paths";

const SearchSchoolRedirectForm = () => {
  const router = useRouter();

  const onSubmit = (values) => {
    router.push({
      pathname: SEARCH_PATH,
      query: { s: values.text, c: "School" },
    });
  };

  return (
    <Formik initialValues={{ text: "" }} onSubmit={onSubmit}>
      <Form>
        <FlexRow width="100%">
          <TextField
            required
            name="text"
            width="100%"
            placeholder="Encuentra la escuela que estas buscando"
          />
          <Button margin="0px 0px 0px 5px" type="submit">
            Buscar
          </Button>
        </FlexRow>
      </Form>
    </Formik>
  );
};

export default SearchSchoolRedirectForm;
