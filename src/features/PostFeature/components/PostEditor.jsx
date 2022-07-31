import { useEffect, useState } from "react";

import FlexColumn from "@components/common/FlexColumn";
import Button from "@components/common/Button";
import { ErrorMessage, TextArea } from "@components/formikFields";
import { Formik, Form } from "formik";
import * as yup from "yup";
import RichTextEditor from "@components/formikFields/RichTextEditor";
import FlexRow from "@components/common/FlexRow";
import { PREVIEW_POST_PATH } from "src/paths";
import styles from "./PostEditor.module.css";
import { useRouter } from "next/router";

function PostEditor({ post, action, handleSubmit }) {
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
    if (action === "edit") {
      setInitialData({
        title: post.attributes.title,
        content: post.attributes.content,
      });
    }

    if (action === "create") {
      localStorage.getItem("editorSave")
        ? setInitialData(JSON.parse(localStorage.getItem("editorSave")))
        : setInitialData({ title: "", content: [] });
    }
  }, [post]);

  return (
    <FlexColumn>
      {initialData && (
        <Formik
          initialValues={{
            title: initialData?.title ? initialData.title : "",
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
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form style={{ padding: 20, backgroundColor: "#fff" }}>
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
                  disabled={
                    props.values.content.length === 0 || props.isSubmitting
                  }
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
                  disabled={props.isSubmitting}
                >
                  {action === "create" && "Publicar"}
                  {action === "edit" && "Guardar"}
                </Button>
              </FlexRow>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
}

PostEditor.defaultProps = {
  post: null,
};

export default PostEditor;
