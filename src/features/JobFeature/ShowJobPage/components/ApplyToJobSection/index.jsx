import Alert from "@components/common/Alert";
import AlertBox from "@components/common/AlertBox";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import { ErrorMessage, TextArea } from "@components/formikFields";
import { AuthContext } from "@context/AuthContext";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  saveJobApplication,
  checkIfUserApplied,
} from "src/data/queryJobApplication";
import { getUserSettingByUser } from "src/data/queryUserSettings";
import { SETTINGS_CURRICULUM_PATH } from "src/paths";
import * as yup from "yup";

function ApplyToJobSection({ job }) {
  const { currentUser } = useContext(AuthContext);
  const [userHasCV, setUserHasCV] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasUserApplied, setHasUserApplied] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      const userSettings = await getUserSettingByUser(currentUser);
      const hasUserApplied = await checkIfUserApplied(
        job.objectId,
        currentUser
      );

      setHasUserApplied(hasUserApplied);

      if (userSettings?.get("curriculum")) {
        setUserHasCV(true);
      }
    };

    getData().finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await saveJobApplication({
        message: values.message,
        jobId: job.objectId,
      });

      resetForm();
      setHasUserApplied(true);

      Alert.fire({
        icon: "success",
        title: "Se envio tu aplicacion",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexColumn padding={10}>
      <Title text="Aplica" margin={"0px 0px 10px 0px"} />

      {isLoading ? (
        <Spinner />
      ) : userHasCV ? (
        hasUserApplied ? (
          <Text text="Ya aplicaste a este trabajo." />
        ) : (
          <>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={handleSubmit}
              validationSchema={yup.object({
                message: yup
                  .string()
                  .min(5, "Muy corto")
                  .max(200, "Demasiados largo"),
              })}
            >
              {(props) => (
                <Form>
                  <FlexColumn margin={"10px 0px 10px 0px"}>
                    <AlertBox
                      text="Tu curriculum sera enviado con tu aplicacion."
                      type={"info"}
                    />
                  </FlexColumn>
                  <TextArea
                    minRows={3}
                    name="message"
                    width={"100%"}
                    placeholder="Deja un mensaje con tu aplicación"
                  />
                  <ErrorMessage name="message" />
                  <Button
                    type="submit"
                    margin={"0px 0px 0px auto"}
                    loading={props.isSubmitting}
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )
      ) : (
        <FlexColumn>
          <AlertBox
            text="Debes crear un curriculum para aplicar"
            type="error"
          />
          <Button
            onClick={() => push(SETTINGS_CURRICULUM_PATH)}
            margin={"10px 0px 0px 0px"}
          >
            Crear Curriculum
          </Button>
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ApplyToJobSection;
