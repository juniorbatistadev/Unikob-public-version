import { useContext } from "react";
import Parse from "parse";
import {
  TextField,
  TextArea,
  SelectField,
  ErrorMessage,
  SelectCountry,
} from "@components/formikFields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import styles from "./ProfileForm.module.css";
import { AuthContext } from "src/contexts/AuthContext";
import Alert from "@components/common/Alert";
import FlexColumn from "@components/common/FlexColumn";

function ProfileForm() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {currentUser && (
        <Formik
          initialValues={{
            username: currentUser.attributes.username,
            email: currentUser.attributes.email,
            bio: currentUser.attributes.bio,
            country: currentUser.attributes.country?.id,
            gender: currentUser.attributes.gender,
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(
                "4",
                "Tu nombre de usuario debe de ser mayor de 4 caracteres"
              )
              .max("30", "Tu nombre de usuario es demasiado largo")
              .required("Tu nombre es requerido"),
            email: Yup.string()
              .email("Escribe un correo valido")
              .required("Correo requerido"),

            bio: Yup.string()
              .min("4", "Tu bio debe de ser mayor de 4 caracteres")
              .max("160", "Demasiado largo"),

            country: Yup.string().nullable(),

            gender: Yup.string(),
          })}
          onSubmit={async (values) => {
            try {
              let country;
              if (values.country) {
                const Country = Parse.Object.extend("Country");
                country = new Country();
                country.id = values.country;
              }

              currentUser.set("email", values.email);
              currentUser.set("bio", values.bio);
              currentUser.set("country", country);
              currentUser.set("username", values.username);
              currentUser.set("gender", values.gender);
              await currentUser.save().then(() => {
                Alert.fire({
                  icon: "success",
                  title: "Perfil Actualizado",
                  timer: 2000,
                  showConfirmButton: false,
                });
              });
            } catch (error) {
              const message =
                error.code === 202
                  ? "Este nombre de usuario ya esta en uso."
                  : error.message
                  ? error.message
                  : error;

              Alert.fire({
                icon: "error",
                title: "Opps",
                text: message,
              });
            }
          }}
        >
          {(props) => (
            <Form className={styles.form}>
              <FlexColumn className={styles.settingField}>
                <Title typeStyle="secondary" text="Nombre de Usuario" />
                <TextField placeholder="Username" name="username" />
                <ErrorMessage name="username" />
              </FlexColumn>
              <FlexColumn className={styles.settingField}>
                <Title typeStyle="secondary" text="Correo Electronico" />
                <TextField placeholder="Correo Electronico" name="email" />
                <ErrorMessage name="email" />
              </FlexColumn>

              <FlexColumn className={styles.settingField}>
                <Title typeStyle="secondary" text="Bio" />
                <TextArea
                  placeholder="Inserta frase cool y motivadora"
                  name="bio"
                  minRows="3"
                />
                <ErrorMessage name="bio" />
              </FlexColumn>
              <FlexColumn className={styles.settingField}>
                <Title typeStyle="secondary" text="Pais" />
                <SelectCountry name="country" placeholder="Elige tu pais" />
                <ErrorMessage name="country" />
              </FlexColumn>
              <FlexColumn className={styles.settingField}>
                <Title typeStyle="secondary" text="Genero" />
                <SelectField
                  placeholder="Elige tu genero"
                  options={[
                    { id: "female", name: "Mujer" },
                    { id: "male", name: "Hombre" },
                  ]}
                  name="gender"
                />
                <ErrorMessage name="gender" />
              </FlexColumn>

              <Button
                className={styles.submitButton}
                loading={props.isSubmitting}
                typeStyle="primary"
                type="submit"
              >
                Guardar Cambios
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default ProfileForm;
