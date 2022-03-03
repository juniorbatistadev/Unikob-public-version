import styles from "./index.module.css";

function Title({
  text,
  fontSize,
  margin,
  typeStyle,
  className,
  level,
  ...props
}) {
  const classNames = [styles[typeStyle], className].join(" ");

  const CustomTag = `h${level}`;

  return (
    <CustomTag
      className={classNames}
      style={{
        fontSize,
        margin,
      }}
      {...props}
    >
      {text}
    </CustomTag>
  );
}

Title.defaultProps = {
  className: " ",
  text: " ",
  fontSize: null,
  typeStyle: "primary",
  level: 2,
};

//can be primary or secondary

export default Title;
