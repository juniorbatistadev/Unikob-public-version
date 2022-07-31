import styles from "./index.module.css";
import NavBar from "@components/common/NavBar";
import SideBar from "@components/common/SideBar";
import Head from "next/head";

function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className={styles["main-container"]} id="main-scrollable-container">
        <SideBar className={styles["sidebar"]} />

        <main className={styles["content"]}>{children}</main>
        <aside className={styles["right-side-bar"]}>
          {/* <p style={{ marginTop: 10 }}> Ads </p> */}
          <img
            alt="Ad"
            style={{ marginTop: 20, marginLeft: 10 }}
            width="200"
            src="https://i.pinimg.com/236x/6a/34/49/6a344987abc2e298780b4afed3df0795--google-banner-banners.jpg"
          />
        </aside>
      </div>
    </div>
  );
}

export default MainLayout;
