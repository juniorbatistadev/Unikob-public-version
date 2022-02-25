import { useEffect, useState } from "react";
import Stat from "./Stat";
import { getViewsNumberByUserId } from "src/data/queryViews";

function Views({ user }) {
  const [views, setViews] = useState();

  useEffect(() => {
    getViewsNumberByUserId(user).then((data) => setViews(data));
  }, [user]);

  return <Stat text="Views" number={views}></Stat>;
}

export default Views;
