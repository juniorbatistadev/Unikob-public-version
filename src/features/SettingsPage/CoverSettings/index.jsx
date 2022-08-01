import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import CoverImagePreview from "./CoverImagePreview";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import { Formik, Form } from "formik";
import { RadioField, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";

import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Alert from "@components/common/Alert";
import useIsMounted from "src/hooks/useIsMounted";

function CoverSettings() {
  const { currentUser } = useContext(AuthContext);
  const { isMounted } = useIsMounted();

  const images = [
    {
      name: "Miches, Rep. Dominicana",
      url: "https://images.unsplash.com/photo-1617718295766-0f839c2853e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
    },
    {
      name: "Nuevo Leon, Mexico",
      url: "https://images.unsplash.com/photo-1581964014051-c572244b90f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      name: "Río Negro, Argentina",
      url: "https://images.unsplash.com/photo-1577801599718-f4e3ad3fc794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Torres del Paine, Chile",
      url: "https://images.unsplash.com/photo-1478827387698-1527781a4887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Guatapé, Colombia",
      url: "https://images.unsplash.com/photo-1539617546058-a8f9510b464e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Machu Picchu, Peru",
      url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Elegir Cover" className={styles.title} />
      </FlexRow>

      {isMounted && currentUser && (
        <Formik
          initialValues={{
            image: currentUser.attributes.coverImage.toString(),
          }}
          validate={(values) => {
            if (!values.image) {
              return {
                image: "Debes selecionar una Imagen",
              };
            }
          }}
          onSubmit={async (values) => {
            currentUser.set("coverImage", values.image);
            currentUser.save().then(() => {
              Alert.fire({
                icon: "success",
                title: "Portada Actualizada",
                timer: 2000,
                showConfirmButton: false,
              });
            });
          }}
        >
          {(props) => (
            <Form className={styles.form}>
              <div className={styles.images}>
                {images.map((image, index) => (
                  <RadioField
                    key={index}
                    name="image"
                    value={image.url}
                    typeStyle="borderLines"
                    className={styles.image}
                  >
                    <CoverImagePreview image={image.url} />
                    <Title
                      text={image.name}
                      typeStyle="secondary"
                      fontSize="var(--text-sm)"
                      className={styles.text}
                    />
                  </RadioField>
                ))}
              </div>
              <ErrorMessage name="image" />
              <Button type="submit" margin="10px" loading={props.isSubmitting}>
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </motion.div>
  );
}

export default CoverSettings;
