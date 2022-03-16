import { Formik, Form } from "formik";
import { TextArea } from "@components/formikFields";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";
import styles from "./SendMessageForm.module.css";
import { saveMessage } from "src/data/queryMessages";

const SendMessageForm = ({ conversation }) => {
  return (
    <FlexColumn className={styles.container}>
      <Formik
        initialValues={{
          message: "",
          conversation,
        }}
        onSubmit={(values, actions) => {
          saveMessage(values);
          actions.resetForm();
        }}
      >
        <Form>
          <FlexRow margin="5px">
            <TextArea
              name="message"
              className={styles.textarea}
              required
              placeholder="Mensaje"
            />
            <Button type="submit" margin="auto 0px 0px 5px">
              Enviar
            </Button>
          </FlexRow>
        </Form>
      </Formik>
    </FlexColumn>
  );
};

export default SendMessageForm;
