import styles from "./index.module.css";
import Button from "@components/common/Button";
import PlusIcon from "@assets/icons/plus.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import Spinner from "@components/common/Spinner";

function AddSchoolToProfileButton({ school }) {
  const [alreadyAdded, setAlreadyAdded] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const result = await school
        .relation("members")
        .query()
        .get(currentUser.id)
        .catch((err) => console.log(err));

      setAlreadyAdded(result ? true : false);
    };

    if (currentUser) getData().finally(() => setIsLoading(false));
  }, [currentUser]);

  const handleClick = async () => {
    if (alreadyAdded) {
      school.relation("members").remove(currentUser);
      school.save();
      setAlreadyAdded(false);
    } else {
      setAlreadyAdded(true);
      school.relation("members").add(currentUser);
      school.save();
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
