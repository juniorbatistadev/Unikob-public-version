import styles from "./HomePage.module.css";
import WelcomeInfo from "./WelcomeInfo";
import AuthSection from "./AuthSection";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <WelcomeInfo />
      <AuthSection />
    </div>
  );
}
