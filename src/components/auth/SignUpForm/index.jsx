import React, { useContext } from "react";
import Parse from "parse";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@components/common/Button";
import styles from "./index.module.css";
import FacebookLogin from "@components/auth/FacebookLogin";
import { CheckBox, TextField, ErrorMessage } from "@components/formikFields";
import { AuthContext } from "src/contexts/AuthContext";
import Alert from "@components/common/Alert";

function SignUpForm() {
  const { setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (values) => {
    const user = new Parse.User();
    user.set("username", values.username);
    user.set("password", values.password);
    user.set("email", values.email);
    try {
      await user.signUp();
      setCurrentUser(Parse.User.current());
      Alert.fire({
        title: "Bienvenido",
        text: "Te enviamos un correo para verificar tu cuenta",
        icon: "success",
      });
    } catch (error) {
      // Show the error message  and let the user try again.
      var message;
      switch (error.code) {
        case 202:
          message = "Este nombre de usuario ya esta en uso.";
          break;
        case 203:
          message = "Ya existe una cuenta con este email";
          break;

        default:
          message = `Hubo un error, ${error.message} contactanos para ayudarte!`;
      }
      Alert.fire({ title: "Oh no!", text: `${message}`, icon: "error" });
    }
  };

  const schema = Yup.object({
    username: Yup.string()
      .min("4", "Tu nombre de usuario debe de ser mayor de 4 caracteres")
      .max("30", "Tu nombre de usuario es demasiado largo")
      .required("Tu nombre es requerido"),
    email: Yup.string().email("Correo invalido").required("Correo requerido"),
    password: Yup.string()
      .min(6, "Codigo secreto muy corto")
      .required("Se te elvido tu codigo secreto"),
    terms: Yup.boolean()
      .required()
      .oneOf([true], "Debes aceptar los terminos y condiciones"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          terms: false,
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className={styles.form}>
            <TextField placeholder="Username" name="username" />
            <ErrorMessage name="username" />
            <TextField placeholder="Tu correo" name="email" type="email" />
            <ErrorMessage name="email" />
            <TextField
              placeholder="Tu codigo secreto"
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />
            <CheckBox name="terms" className={styles.check_box}>
              <span className={styles.terms_text}>
                Acepto los terminos y condiciones
              </span>
            </CheckBox>
            <ErrorMessage name="terms" />
            <div className={styles.btns_container}>
              <FacebookLogin className={styles.facebook_button} />
              <Button
                className={styles.submit_button}
                loading={props.isSubmitting}
                typeStyle="primary"
                type="submit"
              >
                Vamos
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
