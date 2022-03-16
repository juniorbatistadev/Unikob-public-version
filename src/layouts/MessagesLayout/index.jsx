import styles from "./index.module.css";
import NavBar from "@components/common/NavBar";
import FlexColumn from "@components/common/FlexColumn";
import ConversationList from "@pages/MessagesFeature/components/ConversationList";
import ConversationPage from "@pages/MessagesFeature/ConversationPage";
import Text from "@components/common/Text";

function MessagesLayout({ children, conversation }) {
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
            <FlexColumn margin="auto">
              <Text text="No has selecionado una conversacion." />
            </FlexColumn>
          )}
        </main>
        <aside className={styles["right-side-bar"]}>
          <img
            alt="Ad"
            style={{ marginTop: 20 }}
            width="200"
            src="https://i.pinimg.com/236x/6a/34/49/6a344987abc2e298780b4afed3df0795--google-banner-banners.jpg"
          />
        </aside>
      </div>
    </div>
  );
}

export default MessagesLayout;
