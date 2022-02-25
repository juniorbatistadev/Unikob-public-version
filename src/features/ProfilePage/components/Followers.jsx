import { useEffect, useState } from "react";
import { getFollowersNumber } from "src/data/queryFollows";
import Stat from "./Stat";

function Followers({ user, ...props }) {
  const [followers, setFollowers] = useState();

  useEffect(() => {
    getFollowersNumber(user).then((data) => setFollowers(data));
  }, [user]);

  return <Stat text="Seguidores" number={followers} {...props} />;
}

export default Followers;
