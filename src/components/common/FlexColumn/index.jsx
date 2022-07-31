import styles from "./index.module.css";

const FlexColumn = ({
  children,
  margin,
  padding,
  className,
  alignItems,
  justifyContent,
  ...props
}) => {
  const classNames = [styles.flexColumn, className].join(" ");

  return (
    <div
      className={classNames}
      {...props}
      style={{ margin, padding, alignItems, justifyContent }}
    >
      {children}
    </div>
  );
};

FlexColumn.defaultProps = {
  className: " ",
  margin: null,
  alignItems: null,
  justifyContent: null,
  padding: null,
};

export default FlexColumn;
