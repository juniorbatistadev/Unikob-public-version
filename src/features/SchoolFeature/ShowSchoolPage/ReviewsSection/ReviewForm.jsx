import FlexColumn from "@components/common/FlexColumn";
import { Formik, Form } from "formik";
import { TextArea, Rater, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";
import {
  checkIfUserAlreadyReviewedThisSchool,
  saveSchoolRating,
} from "src/data/querySchoolReview";
import * as Yup from "yup";
import styles from "./ReviewForm.module.css";
import Alert from "@components/common/Alert";
import Title from "@components/common/Title";
import { useState, useEffect, useContext } from "react";
import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import useIsMounted from "@hooks/useIsMounted";
import Text from "@components/common/Text";

const ReviewForm = ({ school, reloadData }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alredyReviewed, setAlredyReviewed] = useState();
  const { isMounted } = useIsMounted();

  useEffect(() => {
    const getData = async () => {
      const result = await checkIfUserAlreadyReviewedThisSchool({
        user: currentUser,
        school,
      });

      setAlredyReviewed(result);
    };

    getData().finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (values) => {
    try {
      await saveSchoolRating(values);
      if (reloadData) reloadData();
    } catch (err) {
      Alert.fire({ icon: "error", text: `${err.message}` });
    }
  };

  return (
    <FlexColumn>
      {isLoading ? (
        <Spinner />
      ) : alredyReviewed ? (
        <FlexColumn margin={10}>
          <Text text="Ya enviaste un review de esta escuela." />
          <Button width="fit-content" typeStyle="secondary">
            Borrar tu review
          </Button>
        </FlexColumn>
      ) : (
        <Formik
          initialValues={{
            description: "",
            rating: 0,
            school,
          }}
          validationSchema={Yup.object({
            rating: Yup.number()
              .min(1, "Muy Corto")
              .max(5)
              .required("Olvidaste el rating"),
            description: Yup.string()
              .min(1, "Muy Corto")
              .max(200, "Muy Largo")
              .required("Describe tu experiencia"),
          })}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className={styles.form}>
              <Title text="Deja tu rating" typeStyle="secondary" />

              <Rater
                name="rating"
                setValue={props.setFieldValue}
                value={props.values.rating}
                className={styles.rater}
                size={25}
              />
              <ErrorMessage name="rating" />
              <TextArea
                name="description"
                width="-webkit-fill-available"
                placeholder="Describe tu experiencia"
              />
              <ErrorMessage name="description" />
              <Button
                loading={props.isSubmitting}
                className={styles.submitButton}
              >
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
};

export default ReviewForm;
