import { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";

import { getUserById } from "src/data/queryUsers";
import { AuthContext } from "src/contexts/AuthContext";

import FollowButton from "@components/FollowButton";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Title from "@components/common/Title";
import MessageButton from "@components/MessageButton";

import BioIcon from "@assets/icons/feather.svg";
import StudentIcon from "@assets/icons/student.svg";
import PinIcon from "@assets/icons/pin.svg";

import MenuProfile from "./components/MenuProfile";
import Views from "./components/Views";
import Followers from "./components/Followers";
import Following from "./components/Following";
import CoverImage from "./components/CoverImage";
import ItemWithIcon from "./components/ItemWithIcon";
import styles from "./ProfilePage.module.css";
import Spinner from "@components/common/Spinner";
import A from "@components/common/A";
import { saveView } from "src/data/queryViews";

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState();
  const [Isloading, setIsLoading] = useState(true);

  const { asPath } = useRouter();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const addView = (toUser) => {
      const usersSeen = JSON.parse(localStorage.getItem("usersSeen"));

      //validated the user hasn't seen this profile
      if (Array.isArray(usersSeen) && usersSeen.includes(userId)) return;

      //validate the user is not the same
      if (currentUser && currentUser.id !== userId) return;

      //save user to list locally so another request to the server is not needed
      localStorage.setItem(
        "usersSeen",
        JSON.stringify(
          Array.isArray(usersSeen) ? [...usersSeen, userId] : [userId]
        )
      );

      saveView(currentUser, toUser);
    };

    getUserById(userId).then((user) => {
      setUser(user);
      addView(user);
      setIsLoading(false);
    });
  }, [currentUser, userId]);

  return (
    <>
      {Isloading ? (
        <Spinner />
      ) : (
        <FlexColumn className={styles.container}>
          <FlexColumn className={styles.header}>
            <CoverImage image={user.attributes.coverImage} />
            <FlexRow className={styles.infoTop}>
              <Avatar
                width="125px"
                className={styles.avatar}
                image={user.attributes.profilePicture?.url()}
              />
              <FlexRow className={styles.usernameInfoAndButtons}>
                <Title
                  text={`@${user.attributes.username}`}
                  typeStyle="secondary"
                  fontSize="18px"
                  className={styles.username}
                />
                {currentUser?.id !== user.id && (
                  <FlexRow className={styles.buttons}>
                    <FollowButton userToFollow={user} />

                    <MessageButton toUser={user} />

                    <MenuProfile user={user} />
                  </FlexRow>
                )}
              </FlexRow>
            </FlexRow>
            <FlexColumn>
              <FlexRow className={styles.stats}>
                <Views user={user} />
                <A href={`${asPath}/followers`}>
                  <Followers user={user} className={styles.pointer} />
                </A>
                <A href={`${asPath}/following`}>
                  <Following user={user} className={styles.pointer} />
                </A>
              </FlexRow>
              {user.attributes.bio && (
                <ItemWithIcon IconSVG={BioIcon} text={user.attributes.bio} />
              )}
              {user.attributes.school && (
                <ItemWithIcon
                  className={styles.pointer}
                  //   onClick={() =>
                  //     navigate("/app/school/" + user.attributes.school.id + "/")
                  //   }
                  IconSVG={StudentIcon}
                  text={user.attributes.school.attributes.name}
                />
              )}

              {user.attributes.country && (
                <ItemWithIcon
                  IconSVG={PinIcon}
                  text={user.attributes.country.attributes.name}
                />
              )}
            </FlexColumn>
          </FlexColumn>

          {/* <TabsMenu
    options={[
      { link: "./", name: "Posts" },
      { link: "./comments", name: "Comentarios" },
      { link: "./gifts", name: "Regalos" },
    ]}
  /> */}
          <div className={styles.contentContainer}>
            {/* <Routes>
      <Route path="/" element={<PostSection user={user} />} />
      <Route path="/comments" element={<CommentSection user={user} />} />
      <Route path="/gifts" element={<GiftSection user={user} />} />/
    </Routes> */}
          </div>
        </FlexColumn>
      )}
    </>
  );
}
