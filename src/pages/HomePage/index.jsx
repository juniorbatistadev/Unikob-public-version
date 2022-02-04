import styles from "./HomePage.module.css";
import InfoHero from "./InfoHero";
import AuthSection from "./AuthSection";

function HomePage() {
  return (
    <div className={styles.container}>
      <InfoHero />
      <AuthSection />
    </div>
  );
}

export default HomePage;
