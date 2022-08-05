import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Title from "@components/common/Title";
import UserListItem from "@components/UserListItem";
import { Fragment, useEffect, useState } from "react";
import styles from "./UsersWithMostGiftsGiven.module.css";
import Parse from "parse";

function UsersWithMostGiftsGiven() {
  const [users, setUsers] = useState();

  useEffect(() => {
    Parse.Cloud.run("getUsersWithMostGiftsGiven").then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <FlexColumn>
      <Title
        text="Los miembros mas generosos"
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
                  text={`Regalos enviados (${user.info.total})`}
                  user={user.user}
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

export default UsersWithMostGiftsGiven;
