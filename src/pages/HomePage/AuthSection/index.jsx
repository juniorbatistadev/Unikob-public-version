import styles from "./index.module.css";
import SignUpForm from "@components/auth/SignUpForm";
import LoginForm from "@components/auth/LoginForm";
import hello from "@assets/images/hello.png";
import { useContext, useState } from "react";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import { AuthContext } from "src/contexts/AuthContext";
import WelcomeLoggedUser from "../WelcomeLoggedUser";

function AuthSection() {
  const [isTryingToLogin, setIsTryingToLogin] = useState(true);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {currentUser ? (
        <WelcomeLoggedUser username={currentUser.attributes.username} />
      ) : (
        <>
          <Title
            fontSize="33px"
            text={isTryingToLogin ? "Inicia Sesion" : "Registrate"}
            className={styles.title}
          />
          {isTryingToLogin ? <LoginForm /> : <SignUpForm />}
          <div className={styles.container_button}>
            <p>
              {!isTryingToLogin
                ? "¿Ya tienes cuenta?"
                : "¿Aun no tienes cuenta? ¡Registrate!"}
            </p>
            <Button
              typeStyle="primary"
              onClick={() => setIsTryingToLogin((prev) => !prev)}
            >
              {!isTryingToLogin ? "Inicia Sesion" : "Registrate"}
            </Button>
          </div>
          <img src={hello.src} alt="welcome" className={styles.hello} />{" "}
        </>
      )}
    </div>
  );
}

export default AuthSection;
