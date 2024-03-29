import FlexColumn from "@components/common/FlexColumn";
import { Formik, Form } from "formik";
import { TextArea, Rater, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import {
  saveTeacherRating,
  checkIfUserAlreadyReviewedThisTeacher,
  deleteTeacherReview,
} from "src/data/queryTeachersReviews";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import Alert from "@components/common/Alert";
import Text from "@components/common/Text";
import errorMessages from "src/parseErrorMessages";

const ReviewTeacherForm = ({ teacher, reloadData }) => {
  const [alredyReviewed, setAlredyReviewed] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const result = await checkIfUserAlreadyReviewedThisTeacher({
        user: currentUser,
        teacher,
      });

      setAlredyReviewed(result[0]);
    };

    getData().finally(() => setIsLoading(false));
  }, []);

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (response.isConfirmed) {
      await deleteTeacherReview(alredyReviewed.id);
      setAlredyReviewed(null);
      if (reloadData) reloadData();
      Alert.fire({
        icon: "success",
        text: "Se ha borrado el review",
      });
    }
  };

  return (
    <FlexColumn margin="10px">
      {isLoading ? (
        <Spinner />
      ) : alredyReviewed ? (
        <FlexColumn margin={10}>
          <Text text="Ya dejaste un review de este profesor" />
          <Button width="fit-content" typeStyle="secondary" onClick={onDelete}>
            Borrar tu review
          </Button>
        </FlexColumn>
      ) : (
        <Formik
          initialValues={{
            description: "",
            rating: undefined,
            teacher,
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
          onSubmit={async (values, actions) => {
            try {
              const review = await saveTeacherRating(values);
              actions.resetForm();
              if (reloadData) reloadData();
              setAlredyReviewed(review);
            } catch (error) {
              Alert.fire({
                icon: "error",

                text: `Hubo un error ${
                  error.code && errorMessages[error.code]
                }`,
              });
            }
          }}
        >
          {(props) => (
            <Form>
              <FlexColumn>
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
                <FlexColumn margin={"10px 0px 0px 0px"} alignItems="flex-end">
                  <Button loading={props.isSubmitting} type="submit">
                    Enviar
                  </Button>
                </FlexColumn>
              </FlexColumn>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
};

export default ReviewTeacherForm;
