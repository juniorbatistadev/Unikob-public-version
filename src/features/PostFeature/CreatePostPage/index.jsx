import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import FlexColumn from "@components/common/FlexColumn";
import Button from "@components/common/Button";
import { ErrorMessage, TextArea } from "@components/formikFields";
import { Formik, Form } from "formik";
import { savePost } from "src/data/queryPosts";
import Alert from "@components/common/Alert";
import * as yup from "yup";
import RichTextEditor from "@components/formikFields/RichTextEditor";
import FlexRow from "@components/common/FlexRow";
import { PREVIEW_POST_PATH, READ_POST_PATH } from "src/paths";
import styles from "./index.module.css";
import useAuthenticatedPage from "@hooks/useAuthenticatedPage";
import { useRouter } from "next/router";

function CreatePostPage() {
  const { currentUser } = useContext(AuthContext);
  const { checkingAuth } = useAuthenticatedPage();
  const [initialData, setInitialData] = useState();
  const { push } = useRouter();

  const handlePreview = async (props) => {
    if (props.values.content.length === 0) {
      return;
    }

    const content = await props.values.content.save();

    const postData = { title: props.values.title, content };

    localStorage.setItem("editorSave", JSON.stringify(postData));

    push(PREVIEW_POST_PATH);
  };

  useEffect(() => {
    setInitialData(JSON.parse(localStorage.getItem("editorSave")));
  }, []);

  return (
    <FlexColumn margin="10px">
      {!checkingAuth && (
        <Formik
          initialValues={{
            title: initialData?.title ?? "",
            content: [],
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
              localStorage.removeItem("editorSave");
              push(READ_POST_PATH.replace(":slug", result.attributes.slug));
            } catch (error) {
              Alert.fire({
                icon: "error",
                text: `Hubo un error: ${error}`,
              });
            }
          }}
        >
          {(props) => (
            <Form style={{ padding: 25, backgroundColor: "white" }}>
              <TextArea
                name="title"
                placeholder="Escribe el titulo de tu post"
                className={styles.titleInput}
                style={{
                  fontWeight: "bold",
                  fontSize: "27px",
                  padding: "10px",
                  width: "100%",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: "1px solid #bcb2b2",
                  borderRadius: 0,
                }}
              />
              <ErrorMessage name="title" />
              <RichTextEditor
                name="content"
                data={initialData?.content}
                setFieldValue={props.setFieldValue}
              />
              <ErrorMessage name="content" />

              <FlexRow justifyContent="right">
                <Button
                  disabled={props.values.content.length === 0}
                  type="button"
                  typeStyle="secondary"
                  onClick={() => handlePreview(props)}
                >
                  Preview
                </Button>
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
      )}
    </FlexColumn>
  );
}

export default CreatePostPage;
