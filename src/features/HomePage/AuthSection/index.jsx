import styles from "./index.module.css";
import SignUpForm from "@components/auth/SignUpForm";
import LoginForm from "@components/auth/LoginForm";
import hello from "@assets/images/hello.png";
import { useContext, useState } from "react";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import { AuthContext } from "src/contexts/AuthContext";
import WelcomeLoggedUser from "src/features/HomePage/WelcomeLoggedUser";
import ResetPasswordForm from "@components/auth/ResetPasswordForm";

const LoginContainer = ({ setSectionOpen }) => {
  return (
    <>
      <Title fontSize="33px" text={"Inicia Sesion"} className={styles.title} />
      <LoginForm setSectionOpen={setSectionOpen} />
      <div className={styles.container_button}>
        <p>¿Aun no tienes cuenta? ¡Registrate!</p>
        <Button typeStyle="primary" onClick={() => setSectionOpen("signup")}>
          Registrate
        </Button>
      </div>
    </>
  );
};

const SignUpContainer = ({ setSectionOpen }) => {
  return (
    <>
      <Title fontSize="33px" text={"Registrate"} className={styles.title} />
      <SignUpForm />
      <div className={styles.container_button}>
        <p>¿Ya tienes cuenta?</p>
        <Button typeStyle="primary" onClick={() => setSectionOpen("login")}>
          Inicia Sesion
        </Button>
      </div>
    </>
  );
};

const PasswordContainer = ({ setSectionOpen }) => {
  return (
    <>
      <Title
        fontSize="33px"
        text={"Olvidaste tu contraseña"}
        className={styles.title}
      />
      <ResetPasswordForm setSectionOpen={setSectionOpen} />
      <div className={styles.container_button}>
        <p>¿Aun no tienes cuenta? ¡Registrate!</p>
        <Button typeStyle="primary" onClick={() => setSectionOpen("signup")}>
          Registrate
        </Button>
      </div>
    </>
  );
};

function AuthSection() {
  const [sectionOpen, setSectionOpen] = useState("login");
  const { currentUser } = useContext(AuthContext);

  const renderContent = (section) => {
    switch (section) {
      case "login":
        return <LoginContainer setSectionOpen={setSectionOpen} />;
      case "signup":
        return <SignUpContainer setSectionOpen={setSectionOpen} />;
      case "password":
        return <PasswordContainer setSectionOpen={setSectionOpen} />;

      default:
        return <LoginContainer setSectionOpen={setSectionOpen} />;
    }
  };

  return (
    <div className={styles.container}>
      {currentUser ? (
        <WelcomeLoggedUser username={currentUser.attributes.username} />
      ) : (
        <>
          {renderContent(sectionOpen)}
          <img src={hello.src} alt="welcome" className={styles.hello} />
        </>
      )}
    </div>
  );
}

export default AuthSection;
