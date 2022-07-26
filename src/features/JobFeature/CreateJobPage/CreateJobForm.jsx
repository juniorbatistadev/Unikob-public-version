import { Formik, Form } from "formik";
import {
  TextField,
  ErrorMessage,
  SelectCountry,
  SelectSubject,
} from "@components/formikFields";
import styles from "./CreateJobForm.module.css";
import * as yup from "yup";
import Button from "@components/common/Button";
import Alert from "@components/common/Alert";
import { useRouter } from "next/router";
import FlexColumn from "@components/common/FlexColumn";
import RichTextEditor from "@components/formikFields/RichTextEditor";
import { saveJob } from "src/data/queryJobs";
import { JOB_READ_PATH } from "src/paths";

const CreateSchoolForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (values, actions) => {
    try {
      const params = {
        ...values,
        content: await values.content.save(),
      };

      const result = await saveJob(params);

      push(JOB_READ_PATH.replace(":job", result.attributes.slug));
    } catch (error) {
      Alert.fire({
        icon: "error",
        text: `Hubo un error: ${error}`,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        content: [],
        country: "",
        subjects: "",
      }}
      validationSchema={yup.object({
        title: yup
          .string()
          .min(3, "El titulo es demasiado corto")
          .max(100, "El titulo demasiado largo")
          .required("Titulo es requerido"),
        content: yup
          .array()
          .min(
            5,
            "El articulo debe tener al menos un bloque(text, imagenes , etc)"
          )
          .max(200, "Demasiados bloques, intenta eliminado algunos")
          .nullable(),
        country: yup.string().required("Elige un pais"),
        subjects: yup.mixed().required("Elige las categorias"),
      })}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <FlexColumn margin="0px 0px 5px 0px">
            <TextField
              name="title"
              placeholder="Titulo del trabajo"
              className={styles.input}
            />
            <ErrorMessage name="title" />
          </FlexColumn>
          <FlexColumn className={[styles.editor]}>
            <RichTextEditor
              name="content"
              setFieldValue={props.setFieldValue}
            />
            <ErrorMessage name="content" />
          </FlexColumn>
          <FlexColumn margin="0px 0px 5px 0px">
            <SelectSubject
              name="subjects"
              className={styles.input}
              placeholder="Seleciona las categorias"
              multi={true}
            />
            <ErrorMessage name="subjects" />
          </FlexColumn>

          <FlexColumn margin="0px 0px 5px 0px">
            <SelectCountry
              name="country"
              className={styles.input}
              placeholder="Seleciona un pais"
            />
            <ErrorMessage name="country" />
          </FlexColumn>

          <Button type="submit" loading={props.isSubmitting}>
            Publicar Trabajo
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSchoolForm;
