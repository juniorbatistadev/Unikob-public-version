import { useState } from "react";
import { Formik, Form } from "formik";
import { TextArea, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import Alert from "@components/common/Alert";
import { saveUserReport } from "src/data/queryUserReports";
import errorMessages from "src/parseErrorMessages";

const ReportForm = ({ toUser, content }) => {
  const [wasSent, setWasSent] = useState(false);

  return (
    <FlexColumn alignItems="center">
      <Title text="Reportar" />
      {wasSent ? (
        <Text text="Reporte Enviado" />
      ) : (
        <Formik
          initialValues={{ text: "", toUser, content }}
          onSubmit={async (values) => {
            try {
              await saveUserReport(values);
              setWasSent(true);
            } catch (error) {
              Alert.fire({
                icon: "error",

                text: `Hubo un error. ${
                  error.code && errorMessages[error.code]
                }`,
              });
            }
          }}
          validate={(values) => {
            if (values.text.length < 8)
              return {
                text: "El reporte debe tener al menos 8 caracteres",
              };
          }}
        >
          {(props) => (
            <Form style={{ width: "100%" }}>
              <FlexColumn>
                <FlexColumn margin={"10px 0px 10px 0px"}>
                  <TextArea
                    minRows={1}
                    name="text"
                    placeholder="Describe la razón del reporte"
                    width="-webkit-fill-available"
                  />
                  <ErrorMessage name="text" />
                </FlexColumn>

                <Button type="submit" loading={props.isSubmitting}>
                  Reportar
                </Button>
              </FlexColumn>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
};

export default ReportForm;
