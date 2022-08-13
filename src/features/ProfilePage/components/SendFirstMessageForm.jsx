import { Formik, Form } from "formik";
import { ErrorMessage, TextArea } from "@components/formikFields";
import Button from "@components/common/Button";
import Parse from "parse";
import Alert from "@components/common/Alert";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";

const SendFirstMessageForm = ({ toUser }) => {
  return (
    <div>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values) =>
          Parse.Cloud.run("sendMessageToUser", {
            message: values.message,
            toUser: toUser.id,
          })
            .then(() =>
              Alert.fire({
                icon: "success",
                title: "Mensaje enviado",
                timer: 2000,
                showConfirmButton: false,
              })
            )
            .catch((err) => Alert.fire({ html: err, icon: "error" }))
        }
        validate={(values) => {
          const errors = {};

          if (values.message.length > 1000) {
            errors.message = "Mensaje demasiado largo";
          }

          if (values.message.length < 1) {
            errors.message = "Mensaje vacio";
          }

          return errors;
        }}
      >
        {(props) => (
          <Form>
            <FlexColumn>
              <Title text="Mensaje" margin="0px auto 5px 0px" />
              <TextArea
                name="message"
                placeholder="Escribre tu mensaje aqui"
                width="-webkit-fill-available"
              />
              <ErrorMessage name="message" />
              <Button
                type="submit"
                loading={props.isSubmitting}
                margin="5px 0px 0px auto"
              >
                Enviar
              </Button>
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </div>
  );
};

SendFirstMessageForm.defaultProps = {
  pretext: "",
};

export default SendFirstMessageForm;
