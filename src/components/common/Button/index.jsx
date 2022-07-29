import styles from "./index.module.css";
import loadingCircle from "@assets/images/loading-circle.gif";
import A from "@components/common/A";
import { FEED_PATH } from "src/paths";

const ElementHTML = ({ children, as, ...rest }) => {
  return (
    <>
      {as === "a" && <A {...rest}>{children}</A>}

      {as === "button" && <button {...rest}>{children}</button>}
    </>
  );
};

function Button({
  children,
  typeStyle,
  className,
  onClick,
  width,
  padding,
  margin,
  loading,
  as,
  href,
  disabled,
  ...rest
}) {
  const classNames = [styles.btn, styles[typeStyle], className].join(" ");

  return (
    <ElementHTML
      className={classNames}
      onClick={onClick}
      style={{
        width,
        padding,
        margin,
      }}
      disabled={loading || disabled}
      as={as}
      href={href}
      {...rest}
    >
      {loading ? (
        <>
          <span>Cargando...</span>
          <img src={loadingCircle.src} width="25" alt="loading" />
        </>
      ) : (
        children
      )}
    </ElementHTML>
  );
}

Button.defaultProps = {
  className: " ",
  typeStyle: "primary",
  onClick: null,
  loading: false,
  as: "button",
  disabled: false,
};

export default Button;
