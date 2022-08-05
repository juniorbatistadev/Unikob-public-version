import styles from "./index.module.css";
import Button from "@components/common/Button";
import PlusIcon from "@assets/icons/plus.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import Spinner from "@components/common/Spinner";
import {
  isMemberOfSchool,
  saveSchoolMember,
  unjoinSchool,
} from "src/data/querySchoolMembers";
import Alert from "@components/common/Alert";
import errorMessages from "src/parseErrorMessages";

function AddSchoolToProfileButton({ school }) {
  const [alreadyAdded, setAlreadyAdded] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser)
      isMemberOfSchool(currentUser, school)
        .then((result) => setAlreadyAdded(result))
        .finally(() => setIsLoading(false));
  }, [currentUser]);

  const handleClick = async () => {
    if (alreadyAdded) {
      unjoinSchool(currentUser, school);
      setAlreadyAdded(false);
    } else {
      await saveSchoolMember(school)
        .then(() => setAlreadyAdded(true))
        .catch((error) =>
          Alert.fire({
            icon: "error",
            text: `Hubo un error. ${
              error.code ? errorMessages[error.code] : error
            }`,
          })
        );
    }
  };

  return (
    <>
      {currentUser && (
        <Button
          className={styles.joinButton}
          onClick={handleClick}
          typeStyle={alreadyAdded ? "secondary" : "primary"}
        >
          {isLoading ? (
            <Spinner width={20} />
          ) : alreadyAdded ? (
            "Eliminar escuela de tu perfil"
          ) : (
            <>
              {"Agregar a tu perfil"}
              <PlusIcon width={15} height={15} className={styles.plus} />
            </>
          )}
        </Button>
      )}
    </>
  );
}

export default AddSchoolToProfileButton;
