import { useContext } from "react";
import Parse from "parse";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, ErrorMessage } from "@components/formikFields";
import styles from "./index.module.css";
import Button from "@components/common/Button";
import FacebookLogin from "@components/auth/FacebookLogin";
import { AuthContext } from "src/contexts/AuthContext";
import Alert from "@components/common/Alert";
import { useRouter } from "next/router";
import FlexColumn from "@components/common/FlexColumn";
import { HOME_PATH } from "src/paths";

function ResetPasswordForm({ setSectionOpen }) {
  const onSubmit = (values, actions) => {
    actions.setSubmitting(true);
    Parse.User.requestPasswordReset(values.email)
      .then(() => {
        Alert.fire({
          icon: "success",
          title: "Visita tu Correo",
          text: "Haz click en link en el correo que te enviamos",
        });
      })
      .catch((error) => {
        Alert.fire({
          icon: "error",
          title: "Uh no!",
          text: "Error: " + error.code + " " + error.message,
        });
      })
      .finally(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        setSectionOpen("login");
      });
  };

  const schema = Yup.object({
    email: Yup.string().email("Correo invalido").required("Correo requerido"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className={styles.form}>
            <TextField
              placeholder="Tu correo"
              name="email"
              type="email"
              autoComplete="username"
            />
            <ErrorMessage name="email" />

            <FlexColumn>
              <Button
                className={styles.submit_button}
                loading={props.isSubmitting}
                type="submit"
              >
                Recibir Correo
              </Button>
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </div>
  );
}

ResetPasswordForm.defaultProps = {
  setSectionOpen: () => {},
};

export default ResetPasswordForm;
