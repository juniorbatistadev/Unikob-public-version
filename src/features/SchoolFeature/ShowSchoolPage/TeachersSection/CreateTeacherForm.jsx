import { useState } from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  SelectSubject,
  ErrorMessage,
} from "@components/formikFields";
import FlexColumn from "@components/common/FlexColumn";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import { saveTeacher } from "src/data/queryTeachers";
import * as yup from "yup";
import AlertBox from "@components/common/AlertBox";

const CreateTeacherForm = ({ school, reloadData }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div>
      {isCompleted ? (
        <Text text="Profesor Agregado" />
      ) : (
        <Formik
          initialValues={{
            name: "",
            subjects: "",
            school: school,
          }}
          validationSchema={yup.object({
            name: yup
              .string()
              .min(3, "Muy Corto")
              .max(32, "Muy Largo")
              .required("Falta un nombre"),
            subjects: yup.mixed().required("Elige las asignaturas"),
          })}
          onSubmit={async (values) => {
            try {
              await saveTeacher(values);
              setIsCompleted(true);
              reloadData();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Form>
            <FlexColumn>
              <Title text="Creando Nuevo Profesor" />
              <AlertBox
                text="ATENCION: no podras modificar los datos luego que esten guardados. Debes asegurate que esten correctos."
                type="warning"
              />
              <Text text="Nombre" />
              <TextField
                name="name"
                placeholder="Nombre"
                border="1px solid grey"
              />
              <ErrorMessage name="name" />
              <Text text="Asignaciones" />
              <SelectSubject
                border="1px solid grey"
                name="subjects"
                placeholder="Selecciona la asignaciones"
                multi={true}
              />
              <ErrorMessage name="subjects" />
              <Button margin="10px 0px 0px 0px" type="submit">
                Guardar
              </Button>
            </FlexColumn>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default CreateTeacherForm;
