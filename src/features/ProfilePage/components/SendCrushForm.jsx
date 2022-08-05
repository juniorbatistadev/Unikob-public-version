import { useState } from "react";
import { Formik, Form } from "formik";
import { TextArea, CheckBox } from "@components/formikFields";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import { saveCrush } from "src/data/queryCrushes";
import Alert from "@components/common/Alert";
import errorMessages from "src/parseErrorMessages";

const DeclareCrushForm = ({ toUser }) => {
  const [wasSent, setWasSent] = useState(false);

  return (
    <FlexColumn alignItems="center">
      <Title text="Declarar Crush" />
      {wasSent ? (
        <Text text="Crush Enviado" />
      ) : (
        <Formik
          initialValues={{ text: "", isSecret: false, toUser }}
          onSubmit={async (values) => {
            try {
              await saveCrush(values);
              setWasSent(true);
            } catch (error) {
              Alert.fire({
                icon: "error",

                text: `Hubo un error ${
                  error.code ? errorMessages[error.code] : error
                }`,
              });
            }
          }}
        >
          {(props) => (
            <Form style={{ width: "100%" }}>
              <FlexColumn>
                <TextArea
                  minRows={1}
                  name="text"
                  placeholder="Escribre tu mensaje de declaracion  aqui"
                  width="-webkit-fill-available"
                />
                <FlexRow margin={"5px 0px 5px 0px"}>
                  <CheckBox name="isSecret" />
                  <Text
                    text="Anonimo (tu perfil no sera incluido)"
                    margin={"0px 0px 0px 5px"}
                  />
                </FlexRow>
                <Button type="submit" loading={props.isSubmitting}>
                  Enviar
                </Button>
              </FlexColumn>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
};

export default DeclareCrushForm;
