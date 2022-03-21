import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import { Formik, Form } from "formik";
import {
  TextArea,
  Rater,
  ErrorMessage,
} from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { saveSchoolRating } from "../../../data/querySchoolReview";
import * as Yup from "yup";
import showAlert from "../../../helpers/showAlert/showAlert";

const ReviewForm = ({ school, reloadData }) => {
  return (
    <FlexColumn margin="10px">
      <Formik
        initialValues={{
          description: "",
          rating: undefined,
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
            .required("Olvidaste dar tu opinion"),
        })}
        onSubmit={async (values) => {
          try {
            await saveSchoolRating(values);
            if (reloadData) reloadData();
          } catch (err) {
            showAlert({ type: "error", text: `${err.message}` });
          }
        }}
      >
        {(props) => (
          <Form>
            <Title text="Deja tu rating" typeStyle="secondary" />
            <Rater
              name="rating"
              setValue={props.setFieldValue}
              value={props.values.rating}
            />
            <ErrorMessage name="rating" />
            <Title text="Describe porque" typeStyle="secondary" />
            <TextArea name="description" width="-webkit-fill-available" />
            <ErrorMessage name="description" />
            <Button loading={props.isSubmitting}>Enviar </Button>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default ReviewForm;
