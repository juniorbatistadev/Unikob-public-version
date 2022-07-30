import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import NewUsersList from "./components/NewUsersList";
import MostPopularUsersList from "./components/MostPopularUsersList";
import UsersWithMostGiftsGiven from "./components/UsersWithMostGiftsGiven";
import UsersWithMostGiftsReceived from "./components/UsersWithMostGiftsReceived";
import styles from "./index.module.css";

function DiscoverPage() {
  return (
    <FlexColumn>
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Descubre" />
      </FlexRow>
      <FlexColumn className={styles.content}>
        <NewUsersList />

        <FlexColumn margin={"25px 0px 0px 0px"}>
          <MostPopularUsersList />
        </FlexColumn>
        <FlexColumn margin={"25px 0px 0px 0px"}>
          <UsersWithMostGiftsGiven />
        </FlexColumn>
        <FlexColumn margin={"25px 0px 0px 0px"}>
          <UsersWithMostGiftsReceived />
        </FlexColumn>
      </FlexColumn>
    </FlexColumn>
  );
}

export default DiscoverPage;
