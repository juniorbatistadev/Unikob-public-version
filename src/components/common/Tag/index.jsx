import FlexColumn from "../FlexColumn";
import Text from "../Text";
import styles from "./index.module.css";

function Tag({ text, className, ...props }) {
  const classNames = [styles.container, className].join(" ");

  return (
    <FlexColumn className={classNames} {...props}>
      <Text text={text} fontSize={14} color={"#5585c5"} />
    </FlexColumn>
  );
}

Tag.defaultProps = {
  className: " ",
};

export default Tag;
