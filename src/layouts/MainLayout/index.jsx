import styles from "./index.module.css";
import NavBar from "@components/common/NavBar";
import SideBar from "@components/common/SideBar";
import Head from "next/head";
import Button from "@components/common/Button";
import { CONTACT_PATH } from "src/paths";

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
              Los costos para mantener Unikob en linea son cubiertos solo por
              unos cuantos individuos apasionados por la comunidad.
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

export default MainLayout;
