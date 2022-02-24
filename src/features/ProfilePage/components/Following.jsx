import { useEffect, useState } from "react";
import { getFollowingNumber } from "src/data/queryFollows";
import Stat from "./Stat";

function Following({ user, ...props }) {
  const [following, setFollowing] = useState();

  useEffect(() => {
    getFollowingNumber(user).then((data) => setFollowing(data));
  }, [user]);

  return <Stat text="Siguiendo" number={following} {...props} />;
}

export default Following;
