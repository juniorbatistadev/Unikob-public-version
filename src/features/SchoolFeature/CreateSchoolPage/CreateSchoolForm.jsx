import { Formik, Form } from "formik";
import {
  TextField,
  ErrorMessage,
  RadioField,
  SelectCountry,
  TextArea,
} from "@components/formikFields";
import Title from "@components/common/Title";
import styles from "./CreateSchoolForm.module.css";
import * as yup from "yup";
import Button from "@components/common/Button";
import { saveSchool } from "src/data/querySchools";
import FlexRow from "@components/common/FlexRow";
import Alert from "@components/common/Alert";
import { useRouter } from "next/router";
import { SCHOOL_READ_PATH } from "src/paths";
import FlexColumn from "@components/common/FlexColumn";

const CreateSchoolForm = () => {
  const { push } = useRouter();

  const handleSubmit = (values, actions) => {
    saveSchool({
      name: values.name,
      description: values.description,
      website: values.website,
      country: values.country,
      type: values.type,
    })
      .then((school) => {
        actions.setSubmitting(false);
        Alert.fire({
          icon: "success",
          text: "Escuela Guardada",
        }).then(() =>
          push(SCHOOL_READ_PATH.replace(":school", school.get("slug")))
        );
      })
      .catch((err) => {
        actions.setSubmitting(false);
        Alert.fire({
          icon: "error",
          title: "Uh no!",
          text: `${err.message ? err.message : error}`,
        });
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        website: "",
        type: "college",
        test: "",
        country: "",
      }}
      validationSchema={yup.object({
        name: yup
          .string()
          .min(3, "El nombre es demasiado corto")
          .max(100, "El nombre demasiado largo")
          .required("Nombre es requerido"),
        description: yup
          .string()
          .min(10, "Muy corta")
          .max(500, "Muy largo")
          .required("Requerido"),
        website: yup.string().trim().url(),
        country: yup.string().required("Elige un pais"),
        type: yup.string().required(),
      })}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <FlexColumn margin="0px 0px 5px 0px">
            <Title typeStyle="secondary" text="Nombre" />
            <TextField
              name="name"
              placeholder="Nombre"
              className={styles.input}
            />
            <ErrorMessage name="name" />
          </FlexColumn>
          <FlexColumn margin="0px 0px 5px 0px">
            <Title typeStyle="secondary" text="Descripcion" />
            <TextArea
              minRows="5"
              name="description"
              placeholder="Historia, especialiades, informacion, etc."
              className={styles.input}
            />
            <ErrorMessage name="description" />
          </FlexColumn>
          <FlexColumn margin="0px 0px 5px 0px">
            <Title typeStyle="secondary" text="Enlace URL" />
            <TextField
              name="website"
              placeholder="https://www.escuela.com"
              className={styles.input}
            />
            <ErrorMessage name="website" />
          </FlexColumn>

          <FlexColumn margin="0px 0px 5px 0px">
            <Title typeStyle="secondary" text="Pais" />
            <SelectCountry
              name="country"
              className={styles.input}
              placeholder="Seleciona un pais"
            />
            <ErrorMessage name="country" />
          </FlexColumn>
          <FlexColumn margin="0px 0px 5px 0px">
            <Title typeStyle="secondary" text="Tipo de escuela" />
            <FlexRow className={styles.radios}>
              <RadioField name="type" value="college">
                Universidad
              </RadioField>
              <RadioField name="type" value="highSchool">
                Secundaria
              </RadioField>
            </FlexRow>
          </FlexColumn>

          <Button type="submit" loading={props.isSubmitting}>
            Agregar Escuela
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSchoolForm;
