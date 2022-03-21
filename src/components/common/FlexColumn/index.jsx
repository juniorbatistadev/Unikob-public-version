import styles from "./index.module.css";

const FlexColumn = ({
  children,
  margin,
  padding,
  className,
  alignItems,
  ...props
}) => {
  const classNames = [styles.flexColumn, className].join(" ");

  return (
    <div
      className={classNames}
      {...props}
      style={{ margin, padding, alignItems }}
    >
      {children}
    </div>
  );
};

FlexColumn.defaultProps = {
  className: " ",
  margin: null,
  alignItems: null,
  padding: null,
};

export default FlexColumn;
