import styles from "./index.module.css";
import loadingCircle from "@assets/images/loading-circle.gif";
import A from "@components/common/A";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import FlexRow from "../FlexRow";

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
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <ElementHTML
      className={classNames}
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
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
        <FlexRow alignItems={"center"}>
          <span>Cargando...</span>
          <Spinner width="15px" />
        </FlexRow>
      ) : (
        <>
          {isRippling ? (
            <span
              className={styles.ripple}
              style={{
                left: coords.x,
                top: coords.y,
              }}
            />
          ) : (
            ""
          )}
          <span className={styles.content}>{children}</span>
        </>
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
