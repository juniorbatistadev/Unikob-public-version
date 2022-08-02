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

function LoginForm({ setSectionOpen }) {
  const { setCurrentUser } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      await Parse.User.logIn(values.email, values.password);
      setCurrentUser(Parse.User.current());
      router.push("/feed");
    } catch (err) {
      Alert.fire({
        text: "Contraseña o Correo Incorrecto",
        icon: "error",
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
    <FlexColumn>
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
            <span
              className={styles.text}
              onClick={() => {
                setSectionOpen("password");
              }}
            >
              ¿Olvidaste tu contraseña?
            </span>
            <FlexColumn margin={"10px 0px 0px 0px"} gap="10px">
              <Button loading={props.isSubmitting} type="submit">
                Iniciar
              </Button>
              <p className={styles.or}>O</p>
              <FacebookLogin className={styles.facebook_button} />
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
}

LoginForm.defaultProps = {
  setSectionOpen: () => {},
};

export default LoginForm;
