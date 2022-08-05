import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Title from "@components/common/Title";
import UserListItem from "@components/UserListItem";
import { Fragment, useEffect, useState } from "react";
import { getNewUsers } from "src/data/queryUsers";
import styles from "./NewUsersList.module.css";

function NewUsersList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    getNewUsers({ amount: 10 }).then(setUsers);
  }, []);

  return (
    <FlexColumn>
      <Title
        text="Dale la bienvenida a estos nuevos miembros"
        fontSize={`var(--text-xl)`}
        margin={"0px 0px 15px 0px"}
        className={styles.title}
      />
      <FlexRow className={styles.usersContainer}>
        {users &&
          users.map((user, index) => (
            <Fragment key={index}>
              {user && (
                <UserListItem
                  user={user}
                  withGiftButton={true}
                  typeStyle="box"
                />
              )}
            </Fragment>
          ))}
      </FlexRow>
    </FlexColumn>
  );
}

export default NewUsersList;
