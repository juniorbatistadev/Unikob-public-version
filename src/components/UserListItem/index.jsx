import styles from "./index.module.css";
import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import FollowButton from "@components/FollowButton";

const UserListItem = ({ user }) => {
  return (
    <FlexRow alignItems="center" className={styles.container}>
      <Avatar
        image={user.attributes.profilePicture?.url()}
        linkToUser={user.attributes.username}
      />
      <Text text={user.attributes.username} />
      <FlexRow>
        <FollowButton userToFollow={user} />
      </FlexRow>
    </FlexRow>
  );
};

export default UserListItem;