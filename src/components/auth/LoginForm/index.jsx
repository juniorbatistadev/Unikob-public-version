import { useContext } from "react";
import Parse from "parse";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, ErrorMessage } from "@components/formikFields";
import styles from "./index.module.css";
import Button from "@components/common/Button";
import FacebookLogin from "@components/auth/FacebookLogin";
import { AuthContext } from "src/contexts/AuthContext";
import showAlert from "src/helpers/showAlert/showAlert";
import { useRouter } from "next/router";

function LoginForm() {
  const { setCurrentUser } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      await Parse.User.logIn(values.email, values.password);
      setCurrentUser(Parse.User.current());
      router.push("/feed");
    } catch {
      showAlert({
        text: "Contraseña o Correo Incorrecto",
        type: "error",
      });
    }
  };

  const schema = Yup.object({
    email: Yup.string().email("Correo invalido").required("Correo requerido"),
    password: Yup.string()
      .min(6, "Codigo secreto muy corto")
      .required("Se te olvido tu codigo secreto"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            <TextField
              placeholder="Tu codigo secreto"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <ErrorMessage name="password" />
            <span className={styles.text}>¿Olvidaste tu contraseña?</span>
            <div className={styles.btns_container}>
              <FacebookLogin className={styles.facebook_button} />
              <Button
                className={styles.submit_button}
                loading={props.isSubmitting}
                type="submit"
              >
                Iniciar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
