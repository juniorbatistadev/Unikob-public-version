import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import * as yup from "yup";
import { Form, Formik } from "formik";
import RichTextEditor from "@components/formikFields/RichTextEditor";
import template from "./curriculumTemplate.json";
import FlexColumn from "@components/common/FlexColumn";
import {
  getUserSettingByUser,
  saveUserCurriculumSetting,
} from "src/data/queryUserSettings";
import Alert from "@components/common/Alert";
import { ErrorMessage } from "@components/formikFields";
import errorMessages from "src/parseErrorMessages";

function CurriculumSettings() {
  const { currentUser } = useContext(AuthContext);
  const [initialData, setInitialData] = useState();

  const onSave = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const content = await values.content?.save();

      await saveUserCurriculumSetting({ content, user: currentUser });
      Alert.fire({
        icon: "success",
        title: "Curriculum guardado",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      Alert.fire({
        icon: "error",
        text: `Hubo un error. ${
          error.code ? errorMessages[error.code] : error
        }`,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const settings = await getUserSettingByUser(currentUser);

      const curriculum = settings?.attributes.curriculum ?? template;

      setInitialData(curriculum);
    };

    getData();
  }, [currentUser]);

  return (
    <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
      <FlexRow>
        <GoBackButton />
        <Title text="Curriculum Vitae" className={styles.title} />
      </FlexRow>
      <FlexColumn className={styles.container}>
        {initialData && (
          <Formik
            onSubmit={onSave}
            initialValues={{ content: [] }}
            validationSchema={yup.object({
              content: yup
                .array()
                .min(
                  5,
                  "El articulo debe tener al menos un bloque(text, imagenes , etc)"
                )
                .max(200, "Demasiados bloques, intenta eliminado algunos")
                .nullable(),
            })}
          >
            {(props) => (
              <Form className={styles.form}>
                <RichTextEditor
                  data={initialData}
                  name="content"
                  setFieldValue={props.setFieldValue}
                />
                <ErrorMessage name="content" />
                <Button type="submit" loading={props.isSubmitting}>
                  Guardar
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </FlexColumn>
    </motion.div>
  );
}

export default CurriculumSettings;
