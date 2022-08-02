import styles from "./index.module.css";
import NavBar from "@components/common/NavBar";
import FlexColumn from "@components/common/FlexColumn";
import ConversationList from "@pages/MessagesFeature/components/ConversationList";
import ConversationPage from "@pages/MessagesFeature/ConversationPage";
import Text from "@components/common/Text";
import withAuth from "src/helpers/withAuth";
import EmptyIlustration from "@assets/icons/empty.svg";
import Button from "@components/common/Button";
import { CONTACT_PATH } from "src/paths";

function MessagesLayout({ conversation }) {
  return (
    <div className={styles.container}>
      <FlexColumn
        className={[styles.nav, conversation ? styles.hideOnMobile : " "].join(
          " "
        )}
      >
        <NavBar />
      </FlexColumn>
      <div className={styles["main-container"]} id="main-scrollable-container">
        <FlexColumn
          className={[
            styles.sidebar,
            conversation ? styles.hideOnMobile : " ",
          ].join(" ")}
        >
          <ConversationList />
        </FlexColumn>

        <main
          className={[
            styles.content,
            conversation ? " " : styles.hideOnMobile,
          ].join(" ")}
        >
          {conversation ? (
            <ConversationPage conversation={conversation} />
          ) : (
            <FlexColumn margin="auto" alignItems={"center"}>
              <EmptyIlustration width={300} height={300} />
              <Text text="No has selecionado una conversacion." />
            </FlexColumn>
          )}
        </main>
        <section className={styles["right-side-bar"]}>
          <div className={styles.ad}>
            <h6>¡Tu negocio puede estar aqui!</h6>
            <Button as="a" href={CONTACT_PATH}>
              Escribenos
            </Button>
          </div>
          <div className={styles.ad}>
            <h6>¡Unikob te necesita!</h6>
            <p>
              Los costos para mantener Unikob en linea son cubiertos por unos
              cuantos individuos apasionados por la comunidad.
            </p>
            <Button
              as="a"
              target="_blank"
              href={
                "https://www.paypal.com/donate/?hosted_button_id=P8743QK8AL2SA"
              }
            >
              Donar 💖
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default withAuth(MessagesLayout);
