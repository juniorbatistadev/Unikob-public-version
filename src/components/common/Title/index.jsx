import styles from "./index.module.css";

function Title({ text, fontSize, margin, typeStyle, className, ...props }) {
  const classNames = [styles[typeStyle], className].join(" ");

  return (
    <h1
      className={classNames}
      style={{
        fontSize,
        margin,
      }}
      {...props}
    >
      {text}
    </h1>
  );
}

Title.defaultProps = {
  className: " ",
  text: " ",
  fontSize: null,
  typeStyle: "primary",
};

//can be primary or secondary

export default Title;
