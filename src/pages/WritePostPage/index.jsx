import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import FlexColumn from "@components/common/FlexColumn";
import Button from "@components/common/Button";
import { ErrorMessage } from "@components/formikFields";
import { Formik, Form } from "formik";
import { savePost } from "src/data/queryPosts";
import showAlert from "src/helpers/showAlert/showAlert";
import * as yup from "yup";
import RichTextEditor from "@components/formikFields/RichTextEditor";
import TextArea from "@components/formikFields/TextArea";
import FlexRow from "@components/common/FlexRow";
import { useRouter } from "next/router";
import { READ_POST_PATH } from "src/paths";
import styles from "./index.module.css";

function WritePostPage() {
  const { currentUser } = useContext(AuthContext);
  const { push } = useRouter();

  return (
    <FlexColumn margin="10px">
      <Formik
        initialValues={{
          title: "",
          content: [],
          postOnSchool: true,
        }}
        validationSchema={yup.object({
          title: yup
            .string()
            .min(10, "Muy Corto")
            .max(100, "Muy largo")
            .required("Falta el Titulo"),
          content: yup
            .array()
            .min(
              1,
              "El articulo debe tener al menos un bloque(text, imagenes , etc)"
            )
            .max(200, "Demasiados bloques, intenta eliminado algunos")
            .nullable(),
        })}
        onSubmit={async (values) => {
          try {
            const params = {
              title: values.title,
              content: await values.content.save(),
              user: currentUser,
            };
            const result = await savePost(params);
            push(READ_POST_PATH.replace(":id", result.id));
          } catch (error) {
            showAlert({
              type: "error",
              text: `Hubo un error: ${error}`,
            });
          }
        }}
      >
        {(props) => (
          <Form style={{ padding: 25, backgroundColor: "white" }}>
            <TextArea
              name="title"
              placeholder="Titulo"
              className={styles.titleInput}
              style={{
                fontWeight: "bold",
                fontSize: "27px",
                padding: "10px",
                width: "100%",
                borderBottom: "1px solid #bcb2b2",
                borderRadius: 0,
              }}
            />
            <ErrorMessage name="title" />
            <RichTextEditor
              name="content"
              setFieldValue={props.setFieldValue}
            />
            <ErrorMessage name="content" />

            <FlexRow justifyContent="right">
              <Button typeStyle="secondary">Preview</Button>
              <Button
                type="submit"
                margin="0px 0px 0px 5px"
                loading={props.isSubmitting}
              >
                Publicar
              </Button>
            </FlexRow>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
}

export default WritePostPage;
