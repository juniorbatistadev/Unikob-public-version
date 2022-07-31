import { useState } from "react";
import { Formik, Form } from "formik";
import { TextArea, CheckBox, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import { saveCrush } from "src/data/queryCrushes";
import Alert from "@components/common/Alert";
import { saveUserReport } from "src/data/queryUserReports";

const ReportUserForm = ({ toUser }) => {
  const [wasSent, setWasSent] = useState(false);

  return (
    <FlexColumn alignItems="center">
      <Title text="Reportar Usuario" />
      {wasSent ? (
        <Text text="Usario reportado" />
      ) : (
        <Formik
          initialValues={{ text: "", toUser }}
          onSubmit={async (values) => {
            try {
              await saveUserReport(values);
              setWasSent(true);
            } catch (err) {
              Alert.fire({ icon: "error", text: err.message });
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
                    placeholder="Describe la razón por la cual reportas este usuario"
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

export default ReportUserForm;
