import { useContext } from "react";
import { Formik, Form } from "formik";
import { TextArea, ErrorMessage } from "@components/formikFields";
import { saveComment } from "src/data/queryComments";
import { AuthContext } from "src/contexts/AuthContext";
import Button from "@components/common/Button";
import styles from "./index.module.css";
import * as Yup from "yup";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";

const AddCommentForm = ({ section, reloadData, parentComment }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={Yup.object({
          text: Yup.string().max(260, "Demasido Largo").required("Requerido"),
        })}
        onSubmit={async (values, actions) => {
          await saveComment({
            text: values.text,
            createdBy: currentUser,
            section,
            parentComment,
          });
          reloadData();
          actions.resetForm();
        }}
      >
        <Form>
          <FlexColumn>
            <FlexColumn>
              <TextArea
                className={styles.textarea}
                name="text"
                placeholder="Tu comentario"
              />
              <ErrorMessage name="text" />
            </FlexColumn>

            <FlexRow justifyContent="flex-end" margin="5px 0px">
              <Button>Comentar</Button>
            </FlexRow>
          </FlexColumn>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCommentForm;
