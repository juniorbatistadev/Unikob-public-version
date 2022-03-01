import { CheckBox, ErrorMessage } from "@components/formikFields";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  FOLLOW_NOTIFICATION,
  POST_COMMENT_NOTIFICATION,
  POST_LIKE_NOTIFICATION,
  PROFILE_COMMENT_NOTIFICATION,
  RESPONSE_COMMENT_NOTIFICATION,
} from "@pages/NotificationPage/notificationsType";
import {
  getUserSettingByUser,
  saveNotificationSetting,
} from "src/data/queryUserSettings";

import styles from "./ManageNotificationsForm.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Button from "@components/common/Button";
import Text from "@components/common/Text";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import Spinner from "@components/common/Spinner";
import Alert from "@components/common/Alert";

export default function ManageNotificationsForm() {
  const { currentUser } = useContext(AuthContext);
  const [initialData, setInitialData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserSettingByUser(currentUser);
      setInitialData(data.attributes.notificationsAllowed);
    };

    if (currentUser) {
      getData().finally(() => setIsLoading(false));
    }
  }, [currentUser]);

  console.log(initialData);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            [FOLLOW_NOTIFICATION]: initialData[FOLLOW_NOTIFICATION],
            [PROFILE_COMMENT_NOTIFICATION]:
              initialData[PROFILE_COMMENT_NOTIFICATION],
            [POST_COMMENT_NOTIFICATION]: initialData[POST_COMMENT_NOTIFICATION],
            [RESPONSE_COMMENT_NOTIFICATION]:
              initialData[RESPONSE_COMMENT_NOTIFICATION],
            [POST_LIKE_NOTIFICATION]: initialData[POST_LIKE_NOTIFICATION],
          }}
          onSubmit={async (values) => {
            await saveNotificationSetting({
              user: currentUser,
              notificationTypes: values,
            });

            Alert.fire({
              icon: "success",
              text: "Ajustes Guardados",
              timer: 2000,
              showConfirmButton: false,
            });
            return true;
          }}
          validationSchema={Yup.object({
            follow: Yup.boolean(),
          })}
        >
          {(props) => (
            <Form className={styles.form}>
              <FlexColumn className={styles.typeContainer}>
                <FlexRow>
                  <CheckBox name={FOLLOW_NOTIFICATION} />
                  <Text
                    text="Alguien te empezo a seguir"
                    className={styles.typeContainerText}
                  />
                </FlexRow>
                <ErrorMessage name={FOLLOW_NOTIFICATION} />
              </FlexColumn>
              <FlexColumn className={styles.typeContainer}>
                <FlexRow>
                  <CheckBox name={PROFILE_COMMENT_NOTIFICATION} />
                  <Text
                    text="Recibiste un comentario en tu perfil"
                    className={styles.typeContainerText}
                  />
                </FlexRow>
                <ErrorMessage name={PROFILE_COMMENT_NOTIFICATION} />
              </FlexColumn>
              <FlexColumn className={styles.typeContainer}>
                <FlexRow>
                  <CheckBox name={POST_COMMENT_NOTIFICATION} />
                  <Text
                    text="Recibiste un comentario en tu publicacion"
                    className={styles.typeContainerText}
                  />
                </FlexRow>
                <ErrorMessage name={POST_COMMENT_NOTIFICATION} />
              </FlexColumn>
              <FlexColumn className={styles.typeContainer}>
                <FlexRow>
                  <CheckBox name={RESPONSE_COMMENT_NOTIFICATION} />
                  <Text
                    text="Alguien respondio tu comentario"
                    className={styles.typeContainerText}
                  />
                </FlexRow>
                <ErrorMessage name={RESPONSE_COMMENT_NOTIFICATION} />
              </FlexColumn>
              <FlexColumn className={styles.typeContainer}>
                <FlexRow>
                  <CheckBox name={POST_LIKE_NOTIFICATION} />
                  <Text
                    text="Alguien le gusto tu publicacion"
                    className={styles.typeContainerText}
                  />
                </FlexRow>
                <ErrorMessage name={POST_LIKE_NOTIFICATION} />
              </FlexColumn>

              <Button
                type="submit"
                className={styles.button}
                loading={props.isSubmitting}
              >
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
