import styles from "./index.module.css";

function Text({ text, fontSize, margin, padding, className, color, ...props }) {
  const classNames = [className, styles.text].join(" ");

  return (
    <p
      className={classNames}
      style={{
        fontSize,
        margin,
        padding,
        color,
      }}
      {...props}
    >
      {text}
    </p>
  );
}

Text.defaultProps = {
  className: " ",
  text: " ",
};

export default Text;
