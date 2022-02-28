import { AuthContext } from "@context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FEED_PATH } from "src/paths";

const withAuth = function withAuth(Component) {
  return ({ children, ...props }) => {
    const [checkingAuth, setIsCheckingAuth] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const { replace } = useRouter();

    useEffect(() => {
      if (!currentUser) {
        replace(props?.redirectTo ?? FEED_PATH);
      } else {
        setIsCheckingAuth(false);
      }
    }, []);

    return <>{!checkingAuth && <Component {...props} />}</>;
  };
};

export default withAuth;
