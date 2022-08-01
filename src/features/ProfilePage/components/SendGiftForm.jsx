import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { RadioField, TextField, ErrorMessage } from "@components/formikFields";
import Button from "@components/common/Button";
import styles from "./SendGiftForm.module.css";
import queryGiftOptions, {
  getGiftsWithPagination,
} from "src/data/queryGiftOptions";
import { saveGift } from "src/data/queryGifts";
import Text from "@components/common/Text";
import Spinner from "@components/common/Spinner";
import Title from "@components/common/Title";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";

const SendGiftForm = ({ user }) => {
  const [gifts, setGifts] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wasSent, setWasSent] = useState(false);

  const perPage = 6;

  useEffect(() => {
    setIsLoading(true);
    const getGifts = async () => {
      const results = await getGiftsWithPagination({
        startFrom,
        perPage,
      });
      setIsLoading(false);
      setGifts(results.results);
      setCount(results.count);
    };

    getGifts();
  }, [startFrom, user]);

  const nextPage = () => {
    if (startFrom + perPage < count) {
      setStartFrom((prev) => prev + perPage);
    }
  };

  const lastPage = () => {
    if (startFrom - perPage > -1) {
      setStartFrom((prev) => prev - perPage);
    }
  };

  const calculateCurrentPage = () => {
    return (startFrom + perPage) / perPage;
  };

  return (
    <div>
      {wasSent ? (
        <Title text="Tu Regalo fue enviado!" typeStyle="secondary" />
      ) : (
        <Formik
          initialValues={{
            gift: "",
            message: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const giftOption = await queryGiftOptions.get(values.gift);
            saveGift(user, giftOption, values.message)
              .then(() => setWasSent(true))
              .catch((err) => {
                setErrors({ gift: err.message });
              });
          }}
          validate={(values) => {
            if (values.gift === "")
              return {
                gift: "Debes selecionar un regalo",
              };

            if (values.message.length > 80)
              return {
                message: "Debe de ser menos de 80 caracteres",
              };
          }}
        >
          <Form className={styles.form}>
            <Title text="Elige el regalo" />
            <Title
              text="Solo puedes enviar 3 regalos por dia"
              typeStyle="secondary"
              fontSize="var(--text-sm)"
            />
            <FlexRow justifyContent="center" className={styles.gifts}>
              {isLoading ? (
                <Spinner />
              ) : (
                gifts.map((gift, index) => (
                  <RadioField
                    name="gift"
                    typeStyle="borderLines"
                    value={gift.id}
                    key={index}
                    className={styles.giftPreview}
                  >
                    <div>
                      <img
                        alt={gift.attributes.name}
                        src={gift.attributes.image.url()}
                      />
                      <Text
                        text={gift.attributes.name}
                        fontSize="var(--text-sm)"
                      />
                    </div>
                  </RadioField>
                ))
              )}
            </FlexRow>
            <ErrorMessage name="gift" />
            <FlexColumn
              justifyContent="center"
              alignItems="center"
              margin="15px 0px"
            >
              <TextField
                name="message"
                placeholder="Deja una notita con tu regalo"
              />
              <ErrorMessage name="message" />
            </FlexColumn>

            <FlexRow justifyContent="space-around">
              <Button
                onClick={lastPage}
                disabled={startFrom - perPage < -1}
                typeStyle="secondary"
              >
                Anterior
              </Button>
              {!isLoading && (
                <Text
                  text={`${calculateCurrentPage()} de ${Math.ceil(
                    count / perPage
                  )} paginas`}
                />
              )}
              <Button
                onClick={nextPage}
                disabled={startFrom + perPage > count}
                typeStyle="secondary"
              >
                Siguiente
              </Button>
            </FlexRow>
            <Button type="submit" className={styles.submitButton}>
              Enviar
            </Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default SendGiftForm;
