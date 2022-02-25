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
import Avatar from "@components/common/Avatar";

const AddCommentForm = ({ section, reloadData, parentComment }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <FlexColumn margin="0px 5px">
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
              <FlexRow>
                <Avatar
                  onClick={() => router.push("/me")}
                  className={styles.avatar}
                  image={
                    currentUser.get("profilePicture") &&
                    currentUser.get("profilePicture").url()
                  }
                />
                <FlexColumn className={styles.textAreaContainer}>
                  <TextArea
                    className={styles.textarea}
                    name="text"
                    placeholder="Tu comentario"
                  />
                  <FlexRow justifyContent="flex-end" margin="5px 0px">
                    <ErrorMessage name="text" className={styles.error} />

                    <Button>Comentar</Button>
                  </FlexRow>
                </FlexColumn>
              </FlexRow>
            </FlexColumn>
          </FlexColumn>
        </Form>
      </Formik>
    </FlexColumn>
  );
};

export default AddCommentForm;
