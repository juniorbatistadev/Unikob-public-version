import styles from "./index.module.css";
import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import FollowButton from "@components/FollowButton";
import SendGiftButton from "@components/SendGiftButton";
import DisplayUsername from "@components/common/DisplayUsername";

const UserListItem = ({ user, withGiftButton, typeStyle, text }) => {
  return (
    <div className={styles[typeStyle]}>
      <Avatar
        image={user.attributes.profilePicture?.url()}
        linkToUser={user.attributes.username}
      />
      <DisplayUsername user={user} />
      {text && <Text text={text} />}
      <div className={styles.buttons}>
        <FollowButton userToFollow={user} />
        {withGiftButton && (
          <SendGiftButton toUser={user} typeStyle="secondary" />
        )}
      </div>
    </div>
  );
};

UserListItem.defaultProps = {
  withGiftButton: false,
  typeStyle: "list",
  text: null,
};

export default UserListItem;
