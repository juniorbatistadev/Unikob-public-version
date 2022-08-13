import { Formik, Form } from "formik";
import { ErrorMessage, TextArea } from "@components/formikFields";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";
import styles from "./SendMessageForm.module.css";
import { saveMessage } from "src/data/queryMessages";
import { saveChatMessage } from "src/data/queryChatMessage";
import SendIcon from "@assets/icons/send.svg";
import Alert from "@components/common/Alert";
import errorMessages from "src/parseErrorMessages";

const SendMessageForm = ({ conversation }) => {
  const handleSubmit = (values, actions) => {
    if (conversation) {
      saveMessage(values).catch((error) => {
        Alert.fire({
          icon: "error",
          text: `Hubo un error. ${error.code && errorMessages[error.code]}`,
        });
      });
    } else {
      saveChatMessage(values);
    }
    actions.resetForm();
  };

  return (
    <FlexColumn className={styles.container}>
      <Formik
        initialValues={{
          message: "",
          conversation,
        }}
        validate={(values) => {
          if (values.message.length > 1000) {
            return { message: "Muy Largo" };
          }
          if (values.message.length > 1000 || values.message.length === 0) {
            return { message: "" };
          }
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <FlexRow margin="5px">
              <FlexColumn className={styles.textareaContainer}>
                <ErrorMessage name="message" />

                <TextArea
                  padding={"10px 0px 10px 20px"}
                  name="message"
                  className={styles.textarea}
                  required
                  placeholder="Mensaje"
                />
              </FlexColumn>

              <button
                type="submit"
                margin="auto 0px 0px 5px"
                className={styles.sendButton}
              >
                <SendIcon className={styles.sendIcon} />
              </button>
            </FlexRow>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default SendMessageForm;
