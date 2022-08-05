import { useEffect, useContext, useState } from "react";
import Parse from "parse";
import FaceBookLogo from "@assets/icons/facebook-circular-logo.svg";
import styles from "./index.module.css";
import Button from "@components/common/Button";
import initFacebook from "src/helpers/initFacebook";
import { AuthContext } from "src/contexts/AuthContext";
import { useRouter } from "next/router";
import { FEED_PATH } from "src/paths";
import Alert from "@components/common/Alert";
import errorMessages from "src/parseErrorMessages";

function FacebookLogin({ className }) {
  const [isLoading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    initFacebook();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const user = await Parse.FacebookUtils.logIn("user_gender,email");

      //if a new user, register and login
      if (!user.existed()) {
        window.FB.api(
          "/me?fields=id, name,email,gender,picture.width(480), permissions",
          async function (response) {
            const facebookImage = await getFacebookImage(
              response.picture.data.url,
              user
            );
            // user.set("username", response.id);
            user.set("email", response.email);
            user.set("gender", response.gender);
            user.set("profilePicture", facebookImage);
            user.save().then(() => {
              setCurrentUser(Parse.User.current());
              setLoading(false);
              push(FEED_PATH);
            });
          }
        );
      } else {
        //if user existed login them in
        setCurrentUser(Parse.User.current());
      }
    } catch (error) {
      setLoading(false);
      Alert.fire({
        text: `Hubo un error. ${
          error.code ? errorMessages[error.code] : error
        }`,
        icon: "error",
      });
    }
  };

  const getFacebookImage = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };

    let file = new File([data], "test.jpg", metadata);

    return new Parse.File("facebookProfileImage.jpg", file, "image/jpg");
  };

  return (
    <Button
      type="button"
      className={`${styles.facebook_button} ${className}`}
      loading={isLoading}
      typeStyle="secondary"
      onClick={login}
    >
      <span>Iniciar con Facebook </span>
      <FaceBookLogo alt="Facebook Login" className={styles.facebook_logo} />
    </Button>
  );
}

export default FacebookLogin;
