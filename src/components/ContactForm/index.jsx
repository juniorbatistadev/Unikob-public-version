import Alert from "@components/common/Alert";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import { ErrorMessage, TextArea, TextField } from "@components/formikFields";
import { AuthContext } from "@context/AuthContext";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { saveContactMessage } from "src/data/queryContactMessages";
import * as yup from "yup";

function ContactForm() {
  const { currentUser } = useContext(AuthContext);

  const handleSave = (values, actions) => {
    saveContactMessage(values).then(() => {
      actions.resetForm();
      Alert.fire({
        text: "Mensaje enviado",
        timer: 1500,
        icon: "success",
        showConfirmButton: false,
      });
    });
  };

  return (
    <Formik
      initialValues={{
        email: currentUser?.get("email") ?? "",
        message: "",
      }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email("Correo invalido")
          .required("Correo requerido"),
        message: yup.string().required("Mensaje requerido"),
      })}
      onSubmit={handleSave}
    >
      <Form>
        <FlexColumn gap={10} padding={10}>
          {!currentUser?.get("email") && (
            <>
              <TextField placeholder="Email" name="email" />
              <ErrorMessage name="email" />
            </>
          )}
          <TextArea
            placeholder="¿Que nos quieres decir?"
            minRows={7}
            name="message"
          />
          <ErrorMessage name="message" />
          <Button type="submit">Enviar</Button>
        </FlexColumn>
      </Form>
    </Formik>
  );
}

export default ContactForm;
