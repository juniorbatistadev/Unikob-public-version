import { useContext, useState } from "react";
import Parse from "parse";
import { FileField, ErrorMessage } from "@components/formikFields";
import { Formik, Form } from "formik";
import Button from "@components/common/Button";
import styles from "./PictureForm.module.css";
import { AuthContext } from "src/contexts/AuthContext";
import Avatar from "@components/common/Avatar";
import Alert from "@components/common/Alert";
import defaultAvatar from "@assets/images/default-avatar.jpg";
import FlexColumn from "@components/common/FlexColumn";

function PictureForm() {
  const { currentUser } = useContext(AuthContext);
  const defaultImage = currentUser?.get("profilePicture")
    ? currentUser.get("profilePicture").url()
    : null;

  const [previewImg, setPreviewImage] = useState(defaultImage);

  const validate = (values) => {
    const errors = {};

    if (
      values.file.size > 2137962 ||
      ["image/jpeg", "image/png"].indexOf(values.file.type) === -1
    ) {
      errors.file = "Tu foto debe menos de 2MB, formato PNG/JPEG";
    }

    return errors;
  };

  const onChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewImage(reader.result);
  };

  return (
    <div className={styles.container}>
      <img
        src={previewImg ? previewImg : defaultAvatar.src}
        width="250px"
        height="250px"
        className={styles.avatar}
      />
      <Formik
        initialValues={{
          file: "",
        }}
        onSubmit={async (values) => {
          const parseFile = new Parse.File("profile.jpg", values.file);
          currentUser.set("profilePicture", parseFile);
          currentUser.save().then(() => {
            Alert.fire({
              icon: "success",
              title: "Foto Actualizada",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              currentUser.fetch();
            });
          });
        }}
        validate={validate}
      >
        {(props) => (
          <Form className={styles.form}>
            <FlexColumn margin={"10px 0px 0px 0px"}>
              <FileField
                name="file"
                onChangeCallBack={onChange}
                setFieldValue={props.setFieldValue}
              />
              <ErrorMessage name="file" />
            </FlexColumn>
            <Button
              type="submit"
              className={styles.button}
              loading={props.isSubmitting}
            >
              Subir Foto
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PictureForm;
