import Button from "@components/common/Button";
import { useRouter } from "next/router";
import { HOME_PATH } from "src/paths";

const LoginToAccess = ({ text }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(HOME_PATH);
  };

  return <Button onClick={handleClick}>{text}</Button>;
};

LoginToAccess.defaultProps = {
  text: "Iniciar sesión para acceder",
};

export default LoginToAccess;
